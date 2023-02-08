import { type ReactElement } from "react";
import { GroupButton } from "./groupButton";
import { UserButton } from "./userButton";

function TypeChooser({
  friendNotifications,
  groupNotifications,
}: {
  friendNotifications: boolean;
  groupNotifications: boolean;
}): ReactElement {
  return (
    <span className="inline-flex border-hidden rounded-md w-full">
      <UserButton notifications={friendNotifications} />
      <GroupButton notifications={groupNotifications} />
    </span>
  );
}

export { TypeChooser };
