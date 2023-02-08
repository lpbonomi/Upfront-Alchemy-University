import { type ReactElement } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Router from "next/router";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

import usersABI from "@/abi/users.json";
import { Avatar } from "@/components/common/avatar/avatar";

function FriendRequest({ from }: { from: `0x${string}` }): ReactElement {
  const { data: username } = useContractRead({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "getUsername",
    overrides: {
      from,
    },
  }) as { data: string; isError: boolean; isLoading: boolean };

  const { config: acceptConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "acceptFriendRequest",
    args: [from],
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
    functionName: "deleteFriendRequest",
    args: [from],
  });
  const { write: deleteWrite } = useContractWrite({
    ...deleteConfig,
    onSuccess: () => {
      Router.reload();
    },
  });

  return (
    <div className="pt-4 mb-12 pl-4">
      <div className="float-left">
        {username !== undefined && <Avatar username={username} size={8} />}
      </div>
      <div className="pl-2 mb-1 text-lg font-medium float-left">{username}</div>
      <div className="float-right mr-3 pt-1">
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
export { FriendRequest };
