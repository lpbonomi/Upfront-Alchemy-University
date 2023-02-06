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

function useFriendRequests(): Readonly<Array<{ from: address; to: address }>> {
  const [friendRequests, setFriendRequests] = useState<
    Readonly<Array<{ from: address; to: address }>>
  >([]);

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
      const allFriendRequests = pastEvents.map((event: any) => ({
        from: event.args.from,
        to: event.args.to,
      }));

      contract.on(eventFilter, (_node, _label, owner) => {
        setFriendRequests(() =>
          [
            ...allFriendRequests,
            { from: owner.args.from, to: owner.args.to },
          ].filter(
            (friendRequest) =>
              friends.find((friend) => friend.address === friendRequest.from) ==
              null
          )
        );
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
