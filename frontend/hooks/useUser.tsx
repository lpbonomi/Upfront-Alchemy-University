import { useAccount, useContractRead } from "wagmi";
import { useFriends } from "./useFriends";
import { useGroups } from "./useGroups";
import usersABI from "@/abi/users.json";

import { type IUser } from "@/types/users/user";
import { type address } from "@/types";

function useUser(): Readonly<IUser> | false | null {
  const { address } = useAccount() as { address: address };

  const { data: isRegistered } = useContractRead({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "isRegistered",
    enabled: address !== undefined,
    overrides: {
      from: address,
    },
  }) as { data: boolean };

  const { data: username } = useContractRead({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "getUsername",
    enabled: address !== undefined && isRegistered,
    overrides: {
      from: address,
    },
  }) as { data: string };

  const { data: balance } = useContractRead({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "getBalance",
    enabled: address !== undefined && isRegistered,
    overrides: {
      from: address,
    },
  }) as { data: number };

  const friends = useFriends();
  const groups = useGroups();

  if (address === undefined) {
    return null;
  }

  if (!isRegistered) {
    return false;
  }

  return { address, username, balance, friends, groups };
}

export { useUser };
