import { type ReactElement } from "react";

function Avatar({
  username,
  size,
}: {
  username: string;
  size: number;
}): ReactElement {
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

  const initial = username[0].toUpperCase();
  const colorClass = getColorOfInitial(initial);
  return (
    <div
      className={`flex items-center justify-center h-${size} w-${size} rounded-full ${colorClass} text-gray-800 font-bold mx-auto`}
    >
      <p>{initial}</p>
    </div>
  );
}

export { Avatar };
