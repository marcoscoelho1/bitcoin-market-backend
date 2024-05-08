import { injectable, inject } from 'tsyringe';
import { ICreateAccount } from '../domain/models/ICreateAccount';
import { IAccountRepository } from '../domain/repository/IAccountRepository';
import { IUserRepository } from '@modules/users/domain/repository/IUserRepository';
import AppError from '@shared/errors/AppError';
import { IAccount } from '../domain/models/IAccount';

@injectable()
export default class MakeDepositService {
  constructor(
    @inject('AccountRepository')
    private accountRepository: IAccountRepository,
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    amount,
    type,
  }: ICreateAccount): Promise<IAccount> {
    const userExist = await this.usersRepository.findById(user_id);

    if (!userExist) {
      throw new AppError('User does not exists.');
    }

    const account = await this.accountRepository.create({
      user_id,
      amount,
      type,
    });

    return account;
  }
}
