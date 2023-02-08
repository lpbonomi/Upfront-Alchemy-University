import { UserIcon } from "@heroicons/react/24/outline";
import { type ReactElement } from "react";

function UserButton({
  notifications,
}: {
  notifications: boolean;
}): ReactElement {
  return (
    <button
      type="button"
      className="w-full relative border-hidden rounded-l-md px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
    >
      <span className="sr-only">User</span>
      <UserIcon className="h-5 w-5 inline" aria-hidden="true" />
      {notifications && (
        <div className="absolute top-1 right-11 rounded-full bg-red-500 h-2 w-2" />
      )}
    </button>
  );
}

export { UserButton };
