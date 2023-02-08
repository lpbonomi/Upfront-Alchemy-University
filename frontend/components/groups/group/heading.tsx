import { type ReactElement } from "react";

function Heading({ name }: { name: string }): ReactElement {
  return (
    <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-8 lg:max-w-5xl">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {name} <span className="text-red-500">💃🕺</span>
      </h2>
    </div>
  );
}
export { Heading };
