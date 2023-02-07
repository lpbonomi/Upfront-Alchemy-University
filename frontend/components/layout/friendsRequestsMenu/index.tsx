import { type ReactElement, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bell } from "./bell";
import { FriendRequest } from "./friendRequest";
import { useFriendRequests } from "@/hooks/useFriendRequests";

function FriendsRequestsMenu(): ReactElement {
  const friendRequests = useFriendRequests();

  return (
    <Menu as="div" className="relative mx-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open Friend Requests</span>

          <Bell notifications={friendRequests.length > 0} />
        </Menu.Button>
      </div>
      {friendRequests.length > 0 && (
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
            {friendRequests.map((fr) => {
              if (fr.from === undefined) {
                return null;
              }
              return (
                <Menu.Item key={fr.from}>
                  {() => <FriendRequest from={fr.from} />}
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
}
export { FriendsRequestsMenu };
