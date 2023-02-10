import { type ReactElement } from "react";
import { type IFriend } from "@/types/friends/friend";
import { Avatar } from "@/components/common/avatar/avatar";

function Friend({ friend }: { friend: IFriend }): ReactElement {
  return (
    <div className="space-y-4">
      <div className="[&>*]:mx-auto">
        <Avatar username={friend.username} size={12} />
      </div>
      <div className="space-y-2">
        <div className="text-xs font-medium lg:text-sm">
          <h3>{friend.username}</h3>
          <h3>{friend.balance} wei</h3>
        </div>
      </div>
    </div>
  );
}

export { Friend };
