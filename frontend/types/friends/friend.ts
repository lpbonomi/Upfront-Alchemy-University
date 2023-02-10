import { type address } from "../index";

export interface IFriend {
  address: address;
  username: string;
  balance: number;
}

export interface IFriendRequestEvent {
  from: address;
  to: address;
}
