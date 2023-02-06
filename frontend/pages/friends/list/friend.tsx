import { type ReactElement } from "react";
import { type IFriend } from "@/types/friends/friend";
import { Avatar } from "@/components/avatar/avatar";

function Friend({ friend }: { friend: IFriend }): ReactElement {
  return (
    <div className="space-y-4">
      <Avatar username={friend.username} size={12} />
      <div className="space-y-2">
        <div className="text-xs font-medium lg:text-sm">
          <h3>{friend.username}</h3>
          <p className="text-indigo-600">{friend.address}</p>
        </div>
      </div>
    </div>
  );
}

export { Friend };
