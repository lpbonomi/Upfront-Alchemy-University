import { useState, type ReactElement } from "react";

import { DepositModal } from "./depositModal";
import { WithdrawModal } from "./withdrawModal";

function Transactions(): ReactElement {
  const [openDepositModal, setOpenDepositModal] =
    useState<Readonly<boolean>>(false);
  const [openWithdrawModal, setOpenWithdrawModal] =
    useState<Readonly<boolean>>(false);

  return (
    <>
      <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
        <button
          onClick={() => {
            setOpenWithdrawModal(true);
          }}
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Withdraw money
        </button>
        <button
          onClick={() => {
            setOpenDepositModal(true);
          }}
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Add money
        </button>
      </div>
      <DepositModal
        openDepositModal={openDepositModal}
        setOpenDepositModal={setOpenDepositModal}
      />
      <WithdrawModal
        openWithdrawModal={openWithdrawModal}
        setOpenWithdrawModal={setOpenWithdrawModal}
      />
    </>
  );
}

export { Transactions };
