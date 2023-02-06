import { type ReactElement } from "react";
import { Friend } from "./friend";
import { type IFriend } from "@/types/friends/friend";

function FriendList({
  friends,
}: {
  friends: Readonly<IFriend[]>;
}): ReactElement {
  return (
    <ul
      role="list"
      className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
    >
      {friends?.map((f) => (
        <li key={f.username}>
          <Friend friend={f} />
        </li>
      ))}
    </ul>
  );
}

export { FriendList };
