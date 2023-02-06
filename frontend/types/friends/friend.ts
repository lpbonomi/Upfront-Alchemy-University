import { type address } from "..";

export interface IFriend {
  address: address;
  username: string;
}

export interface IFriendRequestEvent {
  from: address;
  to: address;
}
