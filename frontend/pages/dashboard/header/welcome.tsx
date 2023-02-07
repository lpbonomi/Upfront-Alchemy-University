import { type ReactElement } from "react";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@/components/avatar/avatar";
import { useUser } from "@/hooks/useUser";

function Welcome(): ReactElement {
  const user = useUser();

  return (
    <div className="flex items-center">
      <Avatar username={user?.username ?? "?"} size={16} />
      <div>
        <div className="flex items-center">
          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
            Welcome back, {user?.username}
          </h1>
        </div>
        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
          <dt className="sr-only">Company</dt>
          <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
            <IdentificationIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {user?.address}
          </dd>
          <dt className="sr-only">Account status</dt>
        </dl>
      </div>
    </div>
  );
}
export { Welcome };
