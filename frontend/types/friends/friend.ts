export interface IFriend {
  address: `0x${string}`;
  username: string;
}

export interface IFriendRequestEvent {
  from: `0x${string}`;
  to: `0x${string}`;
}
