import { type ReactElement } from "react";

function WhiteBackground({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  return (
    <div className="h-full bg-white min-h-[85vh]">
      <div className="mx-auto max-w-7xl py-2 px-6 text-center lg:px-8 relative">
        <div className="space-y-8 sm:space-y-12">{children}</div>
      </div>
    </div>
  );
}

export { WhiteBackground };
