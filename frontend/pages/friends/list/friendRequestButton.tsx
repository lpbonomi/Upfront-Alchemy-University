import { PlusIcon } from "@heroicons/react/24/outline";
import { useState, type ReactElement } from "react";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import { ModalForm } from "./modalForm";
import { ModalPanel } from "@/components/modal/modalPanel";

function FriendRequestButton(): ReactElement {
  const [openFriendRequestModal, setOpenFriendRequestModal] =
    useState<Readonly<boolean>>(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  absolute top-10 right-10"
        onClick={() => {
          setOpenFriendRequestModal(true);
        }}
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      <ModalPanel
        title=" Add a Friend!"
        Icon={UserPlusIcon}
        openModal={openFriendRequestModal}
        setOpenModal={setOpenFriendRequestModal}
      >
        <ModalForm />
      </ModalPanel>
    </>
  );
}

export { FriendRequestButton };
