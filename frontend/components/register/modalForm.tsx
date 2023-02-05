import { useState, type FormEvent, type ReactElement } from "react";

import { useContractWrite, usePrepareContractWrite } from "wagmi";

import usersABI from "@/abi/users.json";

function ModalForm(): ReactElement {
  const [username, setUsername] = useState<Readonly<string>>("");
  const [initialDeposit, setInitialDeposit] = useState<Readonly<number>>(0);

  const { config, error } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_USERS_CONTRACT_ADDRESS,
    abi: usersABI,
    functionName: "createUser",
    args: [username],
    enabled: Boolean(username) && initialDeposit > 0,
    overrides: {
      value: initialDeposit,
    },
  });
  console.log({ config, error });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  console.log({ data, isLoading, isSuccess, write });

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    write?.();
  }

  return (
    <>
      <form
        className="mt-5 sm:flex sm:items-center"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-3">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="your username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>
          <div className="col-span-3">
            <label htmlFor="initial_balance" className="sr-only">
              Username
            </label>
            <input
              id="initial_deposit"
              name="initial_deposit"
              type="number"
              className="w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="initial deposit"
              min={1}
              required
              onChange={(e) => {
                setInitialDeposit(e.target.valueAsNumber);
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={
            username.length === 0 || initialDeposit === 0 || write == null
          }
          className="whitespace-nowrap mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        >
          Create User
        </button>
      </form>
    </>
  );
}
export { ModalForm };
