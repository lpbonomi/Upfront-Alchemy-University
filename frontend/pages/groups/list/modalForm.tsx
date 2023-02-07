import { useState, type FormEvent, type ReactElement } from "react";

import { useContractWrite, usePrepareContractWrite } from "wagmi";

import groupsABI from "@/abi/groups.json";

function ModalForm(): ReactElement {
  const [groupName, setGroupName] = useState<Readonly<string>>("");

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_GROUPS_CONTRACT_ADDRESS,
    abi: groupsABI,
    functionName: "createGroup",
    args: [groupName],
  });

  const { write } = useContractWrite(config);

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    write?.();
  }

  return (
    <form
      className="mt-5 sm:flex sm:items-center"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="w-full sm:max-w-xs">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="group's name"
          autoComplete="off"
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
      </div>
      <button
        type="submit"
        disabled={groupName.length === 0 || write == null}
        className="whitespace-nowrap mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      >
        Create Group
      </button>
    </form>
  );
}
export { ModalForm };
