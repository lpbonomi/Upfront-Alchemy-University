import { type ReactElement } from "react";
import { FriendRequestButton } from "../../components/friends/friendRequestButton";
import { Heading } from "../../components/friends/heading";
import { FriendList } from "../../components/friends";
import { useFriends } from "@/hooks/useFriends";

function Friends(): ReactElement {
  const friends = useFriends();

  return (
    <div className="h-full bg-white">
      <div className="mx-auto max-w-7xl py-2 px-6 text-center lg:px-8 relative">
        <div className="space-y-8 sm:space-y-12">
          <FriendRequestButton />
          <Heading />
          <FriendList friends={friends} />
        </div>
      </div>
    </div>
  );
}

export default Friends;
