import { type IFriend } from "../friends/friend";
import { type IExpense } from "./expenses/expense";

export interface IGroup {
  id: number;
  name: string;
  admin: string;
  expenses: IExpense[];
  members: IFriend[];
  paymentCount: number;
}
