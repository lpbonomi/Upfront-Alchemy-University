import { type ReactElement } from "react";
import { Avatars } from "../common/avatar/avatars";
import { type IGroup } from "@/types/groups/group";

function Group({ group }: { group: IGroup }): ReactElement {
  return (
    <div className="space-y-4">
      <Avatars friends={group.members} />
      <div className="space-y-2">
        <div className="text-xs font-medium lg:text-sm">
          <h3>{group?.name}</h3>
        </div>
      </div>
    </div>
  );
}

export { Group };
