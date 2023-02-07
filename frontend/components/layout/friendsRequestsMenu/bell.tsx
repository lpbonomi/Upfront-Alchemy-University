import { type ReactElement } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

function Bell({ notifications }: { notifications: boolean }): ReactElement {
  return (
    <div className="h-6 w-6 relative" aria-hidden="true">
      <BellIcon />
      {notifications && (
        <div className="absolute top-0 right-1 rounded-full bg-red-500 h-2 w-2" />
      )}
    </div>
  );
}

export { Bell };
