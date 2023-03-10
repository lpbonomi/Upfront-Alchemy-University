import { useState, type FormEvent, type ReactElement } from "react";

import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";

import Router from "next/router";
import usersABI from "@/abi/users.json";
import { type address } from "@/types";

function ModalForm(): ReactElement {
  const { address } = useAccount() as { address: address };
  const [transactionError, setTransactionError] =
    useState<Readonly<string>>("");
  const [friendsUersname, setFriendsUsername] = useState<Readonly<string>>("");

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "sendFriendRequest",
    args: [friendsUersname],
    enabled: friendsUersname.length > 0 && address !== undefined,
    onError(error: Error) {
      const e = error as unknown as { reason: string };
      setTransactionError(e.reason);
    },
    onSuccess() {
      setTransactionError("");
    },
  });

  const { write } = useContractWrite({
    ...config,
    onSuccess: () => {
      Router.reload();
    },
    onError(error: Error) {
      const e = error as unknown as { reason: string };
      setTransactionError(e.reason);
    },
  });

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    write?.();
  }

  return (
    <>
      {transactionError?.length > 0 && (
        <div className="text-red-500">{transactionError}</div>
      )}
      <form
        className="mt-5 sm:flex sm:items-center"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="w-full sm:max-w-xs">
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="friend's username"
            autoComplete="off"
            onChange={(e) => {
              setFriendsUsername(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          disabled={friendsUersname.length === 0 || write == null}
          className="whitespace-nowrap mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        >
          Send Friend Request
        </button>
      </form>
    </>
  );
}
export { ModalForm };
