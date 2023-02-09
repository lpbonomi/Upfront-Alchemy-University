import { type ReactElement } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
import Router from "next/router";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

import usersABI from "@/abi/users.json";
import { Avatars } from "@/components/common/avatar/avatars";
import { type IFriend } from "@/types/friends/friend";

function GroupInvite({ groupId }: { groupId: number }): ReactElement {
  const { data: name } = useContractRead({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "getGroupName",
    args: [groupId],
  }) as { data: string; isError: boolean; isLoading: boolean };

  const { data: members } = useContractRead({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "getGroupMembers",
    args: [groupId],
  }) as { data: IFriend[]; isError: boolean; isLoading: boolean };

  const { config: acceptConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "acceptGroupInvitation",
    args: [groupId],
  });
  const { write: acceptWrite } = useContractWrite({
    ...acceptConfig,
    onSuccess: () => {
      Router.reload();
    },
  });

  const { config: deleteConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "deleteGroupInvitation",
    args: [groupId],
  });
  const { write: deleteWrite } = useContractWrite({
    ...deleteConfig,
    onSuccess: () => {
      Router.reload();
    },
  });
  return (
    <div className="pt-4 mb-12 pl-2">
      <div className="float-left mb-2">
        {name !== undefined && <Avatars friends={members} />}
        <span className="ml-2">{name}</span>
      </div>
      <div className="float-right mr-3 pt-2">
        <button
          onClick={() => deleteWrite?.()}
          className="h-6 w-6 mr-3 rounded-md border border-transparent bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <XMarkIcon />
        </button>
        <button
          onClick={() => acceptWrite?.()}
          className="h-6 w-6 rounded-md border border-transparent bg-green-100 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <CheckIcon />
        </button>
      </div>
    </div>
  );
}
export { GroupInvite };
