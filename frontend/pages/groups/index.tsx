import { type ReactElement } from "react";
import { Heading } from "./list/heading";
import { GroupList } from "./list";
import { NewGroupButton } from "./list/newGroupButton";
import { useGroups } from "@/hooks/useGroups";

function Groups(): ReactElement {
  const groups = useGroups();
  return (
    <div className="h-full bg-white">
      <div className="mx-auto max-w-7xl py-2 px-6 text-center lg:px-8 relative">
        <div className="space-y-8 sm:space-y-12">
          <NewGroupButton />
          <Heading />
          <GroupList groups={groups} />
        </div>
      </div>
    </div>
  );
}

export default Groups;
