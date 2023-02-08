import { type Dispatch, type SetStateAction, type ReactElement } from "react";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import { ModalPanel } from "../modal/modalPanel";
import { ModalForm } from "./modalForm";

function RegisterModal({
  openRegisterModal,
  setOpenRegisterModal,
}: {
  openRegisterModal: boolean;
  setOpenRegisterModal: Dispatch<SetStateAction<boolean>>;
}): ReactElement {
  return (
    <ModalPanel
      title="Choose a username before starting!"
      Icon={UserPlusIcon}
      openModal={openRegisterModal}
      setOpenModal={setOpenRegisterModal}
    >
      <ModalForm />
    </ModalPanel>
  );
}

export { RegisterModal };
