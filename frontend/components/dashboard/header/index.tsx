import { type ReactElement } from "react";
import { Transactions } from "./transactions";
import { Welcome } from "./welcome";

function Header(): ReactElement {
  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="min-w-0 flex-1">
            <Welcome />
          </div>
          <Transactions />
        </div>
      </div>
    </div>
  );
}

export { Header };
