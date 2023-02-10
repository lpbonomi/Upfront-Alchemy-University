import { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import usersABI from "@/abi/users.json";

import { type IGroup } from "@/types/groups/group";

function useGroups(): Readonly<IGroup[]> {
  const [groups, setGroups] = useState<Readonly<IGroup[]>>([]);

  const { address } = useAccount() as { address: address };
  const { data, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "getGroups",
    enabled: address !== undefined,
    overrides: {
      from: address,
    },
  }) as { data: IGroup[]; isLoading: boolean };

  useEffect(() => {
    if (!isLoading) {
      setGroups(
        data?.map((group) => ({
          ...group,
          id: Number(group.id.toString()),
          members: group.members.map((member) => ({
            ...member,
            balance: Number(member.balance.toString()),
          })),
        }))
      );
    }
  }, [isLoading, data]);

  return groups;
}

export { useGroups };
