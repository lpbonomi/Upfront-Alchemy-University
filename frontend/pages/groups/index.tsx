import { type ReactElement } from "react";
import { Heading } from "./list/heading";
import { GroupList } from "./list";
import { NewGroupButton } from "./list/newGroupButton";
import { type IGroup } from "@/types/groups/group";

function Groups(): ReactElement {
  const groups = [
    {
      id: 1,
      name: "los pibes",
      members: [
        {
          username: "test",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "west2",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "qest3",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "aest",
          address: "0x0000000000000000000000000000000000000000",
        },
      ],
    },
    {
      id: 2,
      name: "los pibes",
      members: [
        {
          username: "best",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "gest2",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "dest3",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "lest",
          address: "0x0000000000000000000000000000000000000000",
        },
      ],
    },
    {
      id: 3,
      name: "los pibes",
      members: [
        {
          username: "oest",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "aest2",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "qest3",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "vest",
          address: "0x0000000000000000000000000000000000000000",
        },
      ],
    },
    {
      id: 1,
      name: "los pibes",
      members: [
        {
          username: "test",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "west2",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "qest3",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "aest",
          address: "0x0000000000000000000000000000000000000000",
        },
      ],
    },
    {
      id: 2,
      name: "los pibes",
      members: [
        {
          username: "best",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "gest2",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "dest3",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "lest",
          address: "0x0000000000000000000000000000000000000000",
        },
      ],
    },
    {
      id: 3,
      name: "los pibes",
      members: [
        {
          username: "oest",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "aest2",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "qest3",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "vest",
          address: "0x0000000000000000000000000000000000000000",
        },
      ],
    },
    {
      id: 1,
      name: "los pibes",
      members: [
        {
          username: "test",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "west2",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "qest3",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "aest",
          address: "0x0000000000000000000000000000000000000000",
        },
      ],
    },
    {
      id: 2,
      name: "los pibes",
      members: [
        {
          username: "best",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "gest2",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "dest3",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "lest",
          address: "0x0000000000000000000000000000000000000000",
        },
      ],
    },
    {
      id: 3,
      name: "los pibes",
      members: [
        {
          username: "oest",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "aest2",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "qest3",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "vest",
          address: "0x0000000000000000000000000000000000000000",
        },
      ],
    },
    {
      id: 1,
      name: "los pibes",
      members: [
        {
          username: "test",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "west2",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "qest3",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "aest",
          address: "0x0000000000000000000000000000000000000000",
        },
      ],
    },
    {
      id: 2,
      name: "los pibes",
      members: [
        {
          username: "best",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "gest2",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "dest3",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "lest",
          address: "0x0000000000000000000000000000000000000000",
        },
      ],
    },
    {
      id: 3,
      name: "los pibes",
      members: [
        {
          username: "oest",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "aest2",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "qest3",
          address: "0x0000000000000000000000000000000000000000",
        },
        {
          username: "vest",
          address: "0x0000000000000000000000000000000000000000",
        },
      ],
    },
  ] as Readonly<IGroup[]>;

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
