import { Account } from '@modules/account/infra/typeorm/entities/Account';
import { IAccount } from '../../models/IAccount';
import { ICreateAccount } from '../../models/ICreateAccount';
import { IAccountRepository } from '../IAccountRepository';

export default class FakeAccountRepository implements IAccountRepository {
  private accounts: Account[] = [];

  public async create(data: ICreateAccount): Promise<IAccount> {
    const account = new Account();

    account.amount = data.amount;
    account.type = data.type;
    account.user_id = data.user_id;

    this.accounts.push(account);

    return account;
  }

  public async findByUserId(user_id: number): Promise<IAccount[]> {
    const userAccounts = this.accounts.filter(
      account => account.user_id === user_id,
    );

    return userAccounts;
  }
}
