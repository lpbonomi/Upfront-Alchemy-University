import { type ReactElement } from "react";
import { type IExpense } from "@/types/groups/expenses/expense";
import { Avatar } from "@/components/common/avatar/avatar";

function TableBody({ expenses }: { expenses: IExpense[] }): ReactElement {
  return (
    <tbody className="bg-white">
      {expenses?.map((e, index) => (
        <tr key={index} className={index % 2 === 0 ? undefined : "bg-gray-50"}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
              <div className="h-10 w-10 flex-shrink-0">
                <Avatar size={10} username={e.paidBy.username} />
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">
                  {e.paidBy.username}
                </div>
              </div>
            </div>
          </td>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">{e.description}</div>
          </td>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">{e.amount.toString()}</div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export { TableBody };
