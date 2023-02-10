import { type ReactElement } from "react";
import {
  ArrowsRightLeftIcon,
  ScaleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Card } from "./card";
import { useUser } from "@/hooks/useUser";
import ClientOnly from "@/components/common/clientOnly";

function Overview(): ReactElement {
  const user = useUser();

  if (user === false) {
    return <div>loading</div>;
  }

  const transactions = user?.groups.reduce(
    (partialSum, group) => partialSum + group.expenses.length,
    0
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg font-medium leading-6 text-gray-900">Overview</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ClientOnly>
          <Card
            title="Account balance"
            Icon={ScaleIcon}
            amount={`${user?.balance?.toString() ?? "?"} wei`}
          />
        </ClientOnly>
        <ClientOnly>
          <Card
            title="Transactions made"
            Icon={ArrowsRightLeftIcon}
            amount={transactions?.toString() ?? "?"}
          />
        </ClientOnly>
        <ClientOnly>
          <Card
            title="Friends"
            Icon={UserGroupIcon}
            amount={user?.friends.length.toString() ?? "?"}
          />
        </ClientOnly>
      </div>
    </div>
  );
}

export { Overview };
