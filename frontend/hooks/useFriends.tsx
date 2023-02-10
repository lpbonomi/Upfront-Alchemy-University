import { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import usersABI from "@/abi/users.json";

import { type IFriend } from "@/types/friends/friend";

function useFriends(): Readonly<IFriend[]> {
  const [friends, setFriends] = useState<Readonly<IFriend[]>>([]);

  const { address } = useAccount();
  const { data, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "getFriends",
    overrides: {
      from: address,
    },
  }) as { data: IFriend[]; isLoading: boolean };

  useEffect(() => {
    if (!isLoading) {
      setFriends(
        data?.map((friend) => ({
          ...friend,
          balance: Number(friend.balance.toString()),
        }))
      );
    }
  }, [isLoading, data]);

  return friends;
}

export { useFriends };
