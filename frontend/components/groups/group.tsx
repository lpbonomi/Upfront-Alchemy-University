import { type ReactElement } from "react";
import { Avatar } from "@/components/common/avatar/avatar";
import { type IGroup } from "@/types/groups/group";

function Group({ group }: { group: IGroup }): ReactElement {
  return (
    <div className="space-y-4">
      <div className="px-auto inline-flex -space-x-2 overflow-hidden">
        {group?.members.map((member) => (
          <Avatar key={member.username} username={member.username} size={10} />
        ))}
      </div>
      <div className="space-y-2">
        <div className="text-xs font-medium lg:text-sm">
          <h3>{group?.name}</h3>
        </div>
      </div>
    </div>
  );
}

export { Group };
