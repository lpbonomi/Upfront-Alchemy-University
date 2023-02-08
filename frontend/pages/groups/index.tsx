import { type ReactElement } from "react";
import { Heading } from "@/components/groups/heading";
import { GroupList } from "@/components/groups";
import { NewGroupButton } from "@/components/groups/newGroupButton";
import { useGroups } from "@/hooks/useGroups";
import { WhiteBackground } from "@/components/common/layout/whiteBackground";

function Groups(): ReactElement {
  const groups = useGroups();
  return (
    <WhiteBackground>
      <>
        <NewGroupButton />
        <Heading />
        <GroupList groups={groups} />
      </>
    </WhiteBackground>
  );
}

export default Groups;
