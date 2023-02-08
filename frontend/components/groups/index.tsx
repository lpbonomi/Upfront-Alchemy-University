import { type ReactElement } from "react";
import Link from "next/link";
import { Group } from "./group";
import { type IGroup } from "@/types/groups/group";

function GroupList({ groups }: { groups: Readonly<IGroup[]> }): ReactElement {
  return (
    <ul
      role="list"
      className="flex overflow-hidden -space-x-4 mx-auto grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-4"
    >
      {groups?.map((g) => (
        <li key={g.id}>
          <Link href={`/groups/${g.id}`}>
            <Group group={g} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export { GroupList };
