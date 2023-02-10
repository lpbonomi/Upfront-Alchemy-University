import { useEffect, useState } from "react";
import { Contract, type EventFilter } from "ethers";
import {
  useNetwork,
  useProvider,
  useWebSocketProvider,
  useAccount,
} from "wagmi";
import { useFriends } from "./useFriends";
import usersABI from "@/abi/users.json";
import { type address } from "@/types";

function useFriendRequests(): Readonly<address[]> {
  const [friendRequests, setFriendRequests] = useState<Readonly<address[]>>([]);

  const { chain } = useNetwork();
  const provider = useProvider({ chainId: chain?.id });
  const webSocketProvider = useWebSocketProvider({ chainId: chain?.id });
  const { address } = useAccount();
  const friends = useFriends();

  useEffect(() => {
    async function getAllEvents(): Promise<() => void> {
      const contract = new Contract(
        process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
        usersABI,
        provider ?? webSocketProvider
      );
      const eventFilter: EventFilter = contract.filters.FriendRequest(
        null,
        address
      );
      const pastEvents = await contract.queryFilter(eventFilter);
      const allFriendRequests = new Set<address>(
        pastEvents?.map((event: any) => event.args.from)
      );

      contract.on(eventFilter, (_node, _label, owner) => {
        allFriendRequests.add(owner.args.from);
        setFriendRequests(() => Array.from(allFriendRequests));
      });
      return () => {
        contract.removeAllListeners();
      };
    }
    void getAllEvents();
  }, [address, friends, provider, webSocketProvider]);

  return friendRequests;
}

export { useFriendRequests };
