import { useRouter } from "next/router";
import { type ReactElement } from "react";
import { useGroups } from "@/hooks/useGroups";
import { Members } from "@/components/groups/group/members";
import { Heading } from "@/components/groups/group/heading";

function GroupPage(): ReactElement {
  const router = useRouter();
  const { groupId } = router.query as unknown as { groupId: number };

  const group = useGroups()[groupId];

  return (
    <>
      {group !== undefined && (
        <div className="h-full bg-white">
          <div className="mx-auto max-w-7xl py-16 px-6 text-center lg:px-8 relative">
            <div className="space-y-8 sm:space-y-12">
              <Heading name={group.name} />
              <Members members={group.members} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GroupPage;
