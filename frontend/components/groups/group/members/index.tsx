import { type ReactElement } from "react";
import { AddMemberButton } from "./addMemberButton";
import { FriendList } from "@/components/friends";
import { type IFriend } from "@/types/friends/friend";

function Members({
  groupId,
  members,
}: {
  groupId: number;
  members: IFriend[];
}): ReactElement {
  return (
    <>
      <div className="mx-auto max-w-7xl py-2 px-6 text-center lg:px-8 relative">
        <div className="space-y-8 sm:space-y-12">
          <div className="flex">
            <h2 className="text-3xl font-bold tracking-tight text-warm-gray-900 text-left pl-8 pb-4">
              Members
            </h2>
            <div className="flex-1" />
            <div className="pb-4">
              <AddMemberButton groupId={groupId} />
            </div>
          </div>
          <FriendList friends={members} />
        </div>
      </div>
    </>
  );
}

export { Members };
