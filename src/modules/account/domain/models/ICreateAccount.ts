import { AccountType } from './IAccount';

export interface ICreateAccount {
  user_id: number;
  amount: number;
  type: AccountType;
}
