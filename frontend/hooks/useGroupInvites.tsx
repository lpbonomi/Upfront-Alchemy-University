import { useEffect, useState } from "react";
import { Contract, type EventFilter } from "ethers";
import {
  useNetwork,
  useProvider,
  useWebSocketProvider,
  useAccount,
} from "wagmi";
import { useGroups } from "./useGroups";
import usersABI from "@/abi/users.json";
import { type address } from "@/types";

function useGroupInvites(): Readonly<Array<{ groupId: number; to: address }>> {
  const [groupInvites, setGroupInvites] = useState<
    Readonly<Array<{ groupId: number; to: address }>>
  >([]);

  const { chain } = useNetwork();
  const provider = useProvider({ chainId: chain?.id });
  const webSocketProvider = useWebSocketProvider({ chainId: chain?.id });
  const { address } = useAccount();

  const groups = useGroups();

  useEffect(() => {
    async function getAllEvents(): Promise<() => void> {
      const contract = new Contract(
        process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
        usersABI,
        provider ?? webSocketProvider
      );
      const eventFilter: EventFilter = contract.filters.GroupInvite(
        null,
        address
      );
      const pastEvents = await contract.queryFilter(eventFilter);
      const allGroupInvites = pastEvents.map((event: any) => ({
        groupId: event.args.groupId,
        to: event.args.to,
      }));

      contract.on(eventFilter, (_node, _label, owner) => {
        setGroupInvites(() =>
          [
            ...allGroupInvites,
            { groupId: owner.args.groupId, to: owner.args.to },
          ].filter(
            (groupInvite) =>
              groups.find((group) => group.id === groupInvite.groupId) == null
          )
        );
      });
      return () => {
        contract.removeAllListeners();
      };
    }
    void getAllEvents();
  }, [address, groups, provider, webSocketProvider]);

  return groupInvites;
}

export { useGroupInvites };
