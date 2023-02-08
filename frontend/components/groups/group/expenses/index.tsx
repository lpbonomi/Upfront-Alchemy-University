import { type ReactElement } from "react";
import { TableHead } from "./head";
import { TableBody } from "./body";
import { AddExpenseButton } from "./addExpenseButton";
import { type IExpense } from "@/types/groups/expenses/expense";

function Expenses({
  groupId,
  expenses,
}: {
  groupId: number;
  expenses: IExpense[];
}): ReactElement {
  console.log(expenses);
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="flex">
          <h2 className="text-3xl font-bold tracking-tight text-warm-gray-900 text-left pl-8 pb-4">
            Expenses
          </h2>
          <div className="flex-1" />
          <div className="pb-4 pr-8">
            <AddExpenseButton groupId={groupId} />
          </div>
        </div>
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <TableHead />
              <TableBody expenses={expenses} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Expenses };
