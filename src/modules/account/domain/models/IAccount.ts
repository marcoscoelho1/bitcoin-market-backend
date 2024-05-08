export interface IAccount {
  id: number;
  user_id: number;
  amount: number;
  type: string;
  created_at: Date;
  updated_at: Date;
}
export enum AccountType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}
