import { type address } from "..";
import { type IFriend } from "../friends/friend";

export interface IUser {
  address: address;
  username: string;
  balance: number;
  friends: readonly IFriend[];
}
