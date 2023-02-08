import { PlusIcon } from "@heroicons/react/24/outline";
import { useState, type ReactElement } from "react";
import { UserPlusIcon } from "@heroicons/react/20/solid";

import { ExpensesModalForm } from "./modalForm";
import { ModalPanel } from "@/components/common/modal/modalPanel";

function AddExpenseButton({ groupId }: { groupId: number }): ReactElement {
  const [openAddExpensetModal, setOpenAddExpensetModal] =
    useState<Readonly<boolean>>(false);

  return (
    <>
      <button
        type="button"
        className=" rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => {
          setOpenAddExpensetModal(true);
        }}
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      <ModalPanel
        title="Add expense"
        Icon={UserPlusIcon}
        openModal={openAddExpensetModal}
        setOpenModal={setOpenAddExpensetModal}
      >
        <ExpensesModalForm groupId={groupId} />
      </ModalPanel>
    </>
  );
}

export { AddExpenseButton };
