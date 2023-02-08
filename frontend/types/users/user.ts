import { type address } from "..";
import { type IFriend } from "../friends/friend";
import { type IGroup } from "../groups/group";

export interface IUser {
  address: address;
  username: string;
  balance: number;
  friends: readonly IFriend[];
  groups: readonly IGroup[];
}
