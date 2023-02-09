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

function useGroupInvites(): Readonly<number[]> {
  const [groupInvites, setGroupInvites] = useState<Readonly<number[]>>([]);

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
      const allGroupInvites = new Set<number>(
        pastEvents.map((event: any) => Number(event.args.groupId.toString()))
      );

      contract.on(eventFilter, (_node, _label, owner) => {
        allGroupInvites.add(Number(owner.args.groupId.toString()));
        setGroupInvites(() => Array.from(allGroupInvites));
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
