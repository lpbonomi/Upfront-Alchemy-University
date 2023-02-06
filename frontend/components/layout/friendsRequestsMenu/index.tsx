import { type ReactElement, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useContractEvent, useProvider, useWebSocketProvider } from "wagmi";
import { Contract } from "ethers";
import { Bell } from "./bell";
import { FriendRequest } from "./friendRequest";
import { type IFriendRequestEvent } from "@/types/friends/friend";

import usersABI from "@/abi/users.json";

function FriendsRequestsMenu(): ReactElement {
  const [events, setEvents] = useState<Readonly<IFriendRequestEvent[]>>([]);

  async function listenToEvent(
    provider,
    contractAddress,
    abi,
    eventName
  ): Promise<void> {
    const contract = new Contract(contractAddress, abi, provider);
    const eventFilter = contract.filters[eventName]();
    console.log("funciona");
    const event = contract.on(eventFilter, (event, label, owner) => {
      console.log("Event fired:", event);
      console.log("Label:", label);
      console.log("Owner:", owner);
    });
  }

  const chainId = 1337;
  const provider = useProvider({ chainId });
  const webSocketProvider = useWebSocketProvider({ chainId });

  void listenToEvent(
    webSocketProvider ?? provider,
    process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    usersABI,
    "FriendRequest"
  );

  useContractEvent({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    eventName: "FriendRequest",
    listener(node, label, owner: { args: IFriendRequestEvent }) {
      console.log({ node, label, owner });
      setEvents((events) => [
        ...events,
        owner.args,
        // owner.args,
        // owner.args,
        // owner.args,
      ]);
    },
  });

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open Friend Requests</span>
          <Bell notifications={events.length > 0} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {events.map((e) => {
            if (e.from === undefined) {
              return null;
            }
            return (
              <Menu.Item key={e.from}>
                {() => <FriendRequest from={e.from} />}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
export { FriendsRequestsMenu };
