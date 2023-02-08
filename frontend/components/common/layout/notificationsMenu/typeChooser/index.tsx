import { type Dispatch, type SetStateAction, type ReactElement } from "react";
import { GroupButton } from "./groupButton";
import { UserButton } from "./userButton";

function TypeChooser({
  friendNotifications,
  groupNotifications,
  setOpenFriendRequests,
}: {
  friendNotifications: boolean;
  groupNotifications: boolean;
  setOpenFriendRequests: Dispatch<SetStateAction<boolean>>;
}): ReactElement {
  return (
    <span className="inline-flex border-hidden rounded-md w-full">
      <UserButton
        notifications={friendNotifications}
        setOpenFriendRequests={setOpenFriendRequests}
      />
      <GroupButton
        notifications={groupNotifications}
        setOpenFriendRequests={setOpenFriendRequests}
      />
    </span>
  );
}

export { TypeChooser };
