import { type ElementType, type ReactElement } from "react";

function Card({
  title,
  Icon,
  amount,
}: {
  title: string;
  Icon: ElementType;
  amount: string;
}): ReactElement {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="truncate text-sm font-medium text-gray-500">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {amount}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
export { Card };
