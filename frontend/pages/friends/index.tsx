import { useEffect, useState, type ReactElement } from "react";
import { useContractRead } from "wagmi";
import { FriendRequestButton } from "./list/friendRequestButton";
import { Heading } from "./list/heading";
import { FriendList } from "./list";
import { type IFriend } from "@/types/friends/friend";
import usersABI from "@/abi/users.json";

function Friends(): ReactElement {
  const [friends, setFriends] = useState<Array<Readonly<IFriend>>>([]);

  const { data, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "getFriends",
  }) as { data: IFriend[]; isError: boolean; isLoading: boolean };

  useEffect(() => {
    if (!isLoading) {
      setFriends(data);
    }
  }, [data, isLoading]);

  return (
    <div className="h-full bg-white">
      <div className="mx-auto max-w-7xl py-12 px-6 text-center lg:px-8 lg:py-24 relative">
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
