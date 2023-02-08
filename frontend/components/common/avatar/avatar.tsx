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

  function getTextSize(size: number): string {
    switch (size) {
      case 4:
        return "text-xs";
      case 6:
        return "text-sm";
      case 8:
        return "text-sm";
      case 12:
        return "text-lg";
      case 16:
        return "text-2xl";
      default:
        return "text-md";
    }
  }

  const initial = username[0].toUpperCase();
  const colorClass = getColorOfInitial(initial);
  const textSize = getTextSize(size);
  return (
    <div
      className={`flex items-center justify-center h-${size} w-${size} rounded-full ${colorClass} text-gray-800 font-bold`}
    >
      <p className={`${textSize}`}>{initial}</p>
    </div>
  );
}

export { Avatar };
