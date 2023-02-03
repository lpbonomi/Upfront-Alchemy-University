import { useEffect, useState, type ReactElement } from "react";
import { useContractRead } from "wagmi";
import usersABI from "../../abis/users.json";
import { type IFriend } from "../../types/friends/friend";

function Friends(): ReactElement {
  const [friends, setFriends] = useState<Array<Readonly<IFriend>>>([]);

  const { data, isLoading } = useContractRead({
    address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    abi: usersABI,
    functionName: "getFriends",
  }) as { data: IFriend[]; isError: boolean; isLoading: boolean };

  useEffect(() => {
    if (!isLoading) {
      setFriends(data);
    }
  }, [data, isLoading]);

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
    <div className="h-full bg-white">
      <div className="mx-auto max-w-7xl py-12 px-6 text-center lg:px-8 lg:py-24">
        <div className="space-y-8 sm:space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your Friends <span className="text-red-500">&#10084;</span>
            </h2>
          </div>
          <ul
            role="list"
            className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
          >
            {friends?.map((f) => (
              <li key={f.username}>
                <div className="space-y-4">
                  <div
                    className={`flex items-center justify-center h-12 w-12 rounded-full ${getColorOfInitial(
                      f.username[0].toUpperCase()
                    )} text-gray-800 font-bold mx-auto`}
                  >
                    <p>{f.username[0]}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-medium lg:text-sm">
                      <h3>{f.username}</h3>
                      <p className="text-indigo-600">{f.address}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Friends;
