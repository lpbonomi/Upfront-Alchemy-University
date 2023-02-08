import { type ReactElement } from "react";
import { FriendList } from "@/components/friends";
import { type IFriend } from "@/types/friends/friend";

function Members({ members }: { members: IFriend[] }): ReactElement {
  return (
    <>
      <div className="mx-auto max-w-7xl py-2 px-6 text-center lg:px-8 relative">
        <div className="space-y-8 sm:space-y-12">
          <h2 className="text-3xl font-bold tracking-tight text-warm-gray-900 text-left pl-12">
            Members
          </h2>
          <FriendList friends={members} />
        </div>
      </div>
    </>
  );
}

export { Members };
