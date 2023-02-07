import { type address } from "../index";

export interface IFriend {
  address: address;
  username: string;
}

export interface IFriendRequestEvent {
  from: address;
  to: address;
}
