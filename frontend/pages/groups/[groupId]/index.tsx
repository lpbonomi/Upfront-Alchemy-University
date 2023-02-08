import { useRouter } from "next/router";
import { type ReactElement } from "react";
import { useGroups } from "@/hooks/useGroups";
import { Members } from "@/components/groups/group/members";
import { Heading } from "@/components/groups/group/heading";

import { Expenses } from "@/components/groups/group/expenses";
import { WhiteBackground } from "@/components/common/layout/whiteBackground";

function GroupPage(): ReactElement {
  const router = useRouter();
  const { groupId } = router.query as unknown as { groupId: number };

  const group = useGroups().find(
    (group) => group.id.toString() === groupId.toString()
  );

  return (
    <>
      {group !== undefined && (
        <WhiteBackground>
          <>
            <Heading name={group.name} />
            <Members members={group.members} />
            <Expenses groupId={groupId} expenses={group.expenses} />
          </>
        </WhiteBackground>
      )}
    </>
  );
}

export default GroupPage;
