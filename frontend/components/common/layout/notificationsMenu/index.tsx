import { type ReactElement, Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bell } from "./bell";
import { FriendRequest } from "./requests/friendRequest";
import { TypeChooser } from "./typeChooser";
import { GroupInvite } from "./requests/groupInvite";
import { useFriendRequests } from "@/hooks/useFriendRequests";
import { useGroupInvites } from "@/hooks/useGroupInvites";

function NotificationsMenu(): ReactElement {
  const friendRequests = useFriendRequests();
  const groupInvites = useGroupInvites();

  const hasFriendRequests = friendRequests.length > 0;
  const hasGroupInvites = groupInvites.length > 0;

  const [openFriendRequests, setOpenFriendRequests] =
    useState<Readonly<boolean>>(hasFriendRequests);

  console.log({ hasFriendRequests, hasGroupInvites });

  return (
    <Menu as="div" className="relative mx-3 inline-block text-left">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open Friend Requests</span>

          <Bell notifications={friendRequests.length > 0} />
        </Menu.Button>
      </div>
      {(hasFriendRequests || hasGroupInvites) && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-96 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <TypeChooser
              friendNotifications={hasFriendRequests}
              groupNotifications={hasGroupInvites}
              setOpenFriendRequests={setOpenFriendRequests}
            />

            {openFriendRequests &&
              friendRequests.map((fr) => {
                if (fr.from === undefined) {
                  return null;
                }
                return (
                  <Menu.Item key={fr.from}>
                    {() => <FriendRequest from={fr.from} />}
                  </Menu.Item>
                );
              })}
            {!openFriendRequests &&
              groupInvites.map((gi) => (
                <>
                  {gi.groupId !== undefined && (
                    <Menu.Item key={gi.groupId}>
                      {() => <GroupInvite groupId={gi.groupId} />}
                    </Menu.Item>
                  )}
                </>
              ))}
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
}
export { NotificationsMenu };
