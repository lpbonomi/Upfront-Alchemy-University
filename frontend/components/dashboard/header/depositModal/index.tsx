import { type Dispatch, type SetStateAction, type ReactElement } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { DepositModalForm } from "./modalForm";
import { ModalPanel } from "@/components/common/modal/modalPanel";

function DepositModal({
  openDepositModal,
  setOpenDepositModal,
}: {
  openDepositModal: boolean;
  setOpenDepositModal: Dispatch<SetStateAction<boolean>>;
}): ReactElement {
  return (
    <ModalPanel
      title="Add new funds"
      Icon={CurrencyDollarIcon}
      openModal={openDepositModal}
      setOpenModal={setOpenDepositModal}
    >
      <DepositModalForm />
    </ModalPanel>
  );
}

export { DepositModal };
