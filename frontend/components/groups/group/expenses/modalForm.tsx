import { useState, type FormEvent, type ReactElement } from "react";

import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";

import Router from "next/router";
import usersABI from "@/abi/users.json";
import { type address } from "@/types";

function ExpensesModalForm({ groupId }: { groupId: number }): ReactElement {
  const { address } = useAccount() as { address: address };
  const [transactionError, setTransactionError] =
    useState<Readonly<string>>("");
  const [description, setDescription] = useState<Readonly<string>>("");
  const [amount, setAmount] = useState<Readonly<number>>(0);

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "addExpense",
    args: [groupId, description, amount],
    enabled: amount > 0 && address !== undefined,
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
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-3">
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className="w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="short description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
          </div>
          <div className="col-span-3">
            <label htmlFor="amount" className="sr-only">
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              className="w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="amount"
              autoComplete="off"
              min={0}
              onChange={(e) => {
                setAmount(e.target.valueAsNumber);
              }}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={amount === 0 || write == null}
          className="whitespace-nowrap mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        >
          Add Expense
        </button>
      </form>
    </>
  );
}
export { ExpensesModalForm };
