import { type IFriend } from "../friends/friend";

export interface IGroup {
  id: number;
  name: string;
  admin: string;
  members: IFriend[];
  paymentCount: number;
}
