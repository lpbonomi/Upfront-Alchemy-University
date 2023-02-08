import { type ReactElement } from "react";
import { Avatar } from "./avatar";
import { type IFriend } from "@/types/friends/friend";

function Avatars({ friends }: { friends: IFriend[] }): ReactElement {
  return (
    <div className="px-auto inline-flex -space-x-4 overflow-hidden">
      {friends.map((f) => (
        <Avatar key={f.username} username={f.username} size={10} />
      ))}
    </div>
  );
}

export { Avatars };
