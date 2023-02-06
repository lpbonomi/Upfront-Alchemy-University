import { useEffect, useState } from "react";
import { Contract, type EventFilter } from "ethers";
import {
  useNetwork,
  useProvider,
  useWebSocketProvider,
  useAccount,
} from "wagmi";
import usersABI from "@/abi/users.json";
import { type address } from "@/types";

function useNotifications(): {
  events: Readonly<Array<{ from: address; to: address }>>;
} {
  const [events, setEvents] = useState<
    Readonly<Array<{ from: address; to: address }>>
  >([]);

  const { chain } = useNetwork();
  const provider = useProvider({ chainId: chain?.id });
  const webSocketProvider = useWebSocketProvider({ chainId: chain?.id });
  const { address } = useAccount();

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
      setEvents(
        pastEvents.map((event: any) => ({
          from: event.args.from,
          to: event.args.to,
        }))
      );

      contract.on(eventFilter, (node, label, owner) => {
        setEvents((prevEvents) => [
          ...prevEvents,
          { from: owner.args.from, to: owner.args.to },
        ]);
      });
      return () => {
        contract.removeAllListeners();
      };
    }
    void getAllEvents();
  }, [address, provider, webSocketProvider]);

  return { events };
}

export { useNotifications };
