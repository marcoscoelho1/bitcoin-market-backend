import { IAccountRepository } from '@modules/account/domain/repository/IAccountRepository';
import { Repository, getRepository } from 'typeorm';
import { Account } from '../entities/Account';
import { IAccount } from '@modules/account/domain/models/IAccount';
import { ICreateAccount } from '@modules/account/domain/models/ICreateAccount';

export default class AccountRepository implements IAccountRepository {
  private ormRepository: Repository<Account>;
  constructor() {
    this.ormRepository = getRepository(Account);
  }

  public async create({
    amount,
    type,
    user_id,
  }: ICreateAccount): Promise<IAccount> {
    const account = await this.ormRepository.create({ amount, type, user_id });
    this.ormRepository.save(account);
    return account;
  }

  public async findByUserId(user_id: number): Promise<IAccount[]> {
    const account = await this.ormRepository.find({ where: { user_id } });

    return account;
  }
}
