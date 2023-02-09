import { type ReactElement } from "react";
import { Overview } from "../../components/dashboard/overview";
import { Header } from "../../components/dashboard/header";

function Dashboard(): ReactElement {
  return (
    <main className="flex-1 pb-8">
      <Header />
      <div className="mt-8">
        <Overview />
      </div>
    </main>
  );
}

export { Dashboard };
