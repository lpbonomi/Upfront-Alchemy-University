import { type ReactElement } from "react";
import { FriendRequestButton } from "../../components/friends/friendRequestButton";
import { Heading } from "../../components/friends/heading";
import { FriendList } from "../../components/friends";
import { useFriends } from "@/hooks/useFriends";
import { WhiteBackground } from "@/components/common/layout/whiteBackground";

function Friends(): ReactElement {
  const friends = useFriends();

  return (
    <WhiteBackground>
      <>
        <FriendRequestButton />
        <Heading />
        <FriendList friends={friends} />
      </>
    </WhiteBackground>
  );
}

export default Friends;
