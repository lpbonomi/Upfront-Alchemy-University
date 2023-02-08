import { type Dispatch, type SetStateAction, type ReactElement } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { WithdrawModalForm } from "./modalForm";
import { ModalPanel } from "@/components/common/modal/modalPanel";

function WithdrawModal({
  openWithdrawModal,
  setOpenWithdrawModal,
}: {
  openWithdrawModal: boolean;
  setOpenWithdrawModal: Dispatch<SetStateAction<boolean>>;
}): ReactElement {
  return (
    <ModalPanel
      title="Withdraw funds"
      Icon={CurrencyDollarIcon}
      openModal={openWithdrawModal}
      setOpenModal={setOpenWithdrawModal}
    >
      <WithdrawModalForm />
    </ModalPanel>
  );
}

export { WithdrawModal };
