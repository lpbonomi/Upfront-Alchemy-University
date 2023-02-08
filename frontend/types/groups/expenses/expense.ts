import { type IFriend } from "@/types/friends/friend";

export interface IExpense {
  id: number;
  paidBy: IFriend;
  description: string;
  amount: number;
}
