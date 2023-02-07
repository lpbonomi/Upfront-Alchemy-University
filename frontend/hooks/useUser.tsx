import { useAccount, useContractRead } from "wagmi";
import { useFriends } from "./useFriends";
import usersABI from "@/abi/users.json";

import { type IUser } from "@/types/users/user";
import { type address } from "@/types";

function useUser(): Readonly<IUser> | null {
  const { address } = useAccount() as { address: address };

  const { data: isRegistered } = useContractRead({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "isRegistered",
    overrides: {
      from: address,
    },
  }) as { data: boolean };

  const { data: username } = useContractRead({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "getUsername",
    overrides: {
      from: address,
    },
  }) as { data: string };

  const { data: balance } = useContractRead({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "getBalance",
    overrides: {
      from: address,
    },
  }) as { data: number };

  const friends = useFriends();

  if (!isRegistered) {
    return null;
  }

  return { address, username, balance, friends };
}

export { useUser };
