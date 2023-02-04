import { type ReactElement } from "react";
import { type IFriend } from "@/types/friends/friend";

function Avatar({ friend }: { friend: IFriend }): ReactElement {
  function getColorOfInitial(initial: string): string {
    const colors = [
      "bg-red-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[initial.charCodeAt(0) % colors.length];
  }
  return (
    <div className="space-y-4">
      <div
        className={`flex items-center justify-center h-12 w-12 rounded-full ${getColorOfInitial(
          friend.username[0].toUpperCase()
        )} text-gray-800 font-bold mx-auto`}
      >
        <p>{friend.username[0]}</p>
      </div>
      <div className="space-y-2">
        <div className="text-xs font-medium lg:text-sm">
          <h3>{friend.username}</h3>
          <p className="text-indigo-600">{friend.address}</p>
        </div>
      </div>
    </div>
  );
}

export { Avatar };
