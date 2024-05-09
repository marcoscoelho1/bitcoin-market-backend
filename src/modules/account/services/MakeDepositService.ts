import { injectable, inject } from 'tsyringe';
import { ICreateAccount } from '../domain/models/ICreateAccount';
import { IAccountRepository } from '../domain/repository/IAccountRepository';
import { IUserRepository } from '@modules/users/domain/repository/IUserRepository';
import AppError from '@shared/errors/AppError';
import { IAccount } from '../domain/models/IAccount';
import { ISendEmailService } from '@shared/domain/services/ISendEmailService';

@injectable()
export default class MakeDepositService {
  constructor(
    @inject('AccountRepository')
    private accountRepository: IAccountRepository,
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('SendEmailService')
    private sendEmailService: ISendEmailService,
  ) {}

  public async execute({
    user_id,
    amount,
    type,
  }: ICreateAccount): Promise<IAccount> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const account = await this.accountRepository.create({
      user_id,
      amount,
      type,
    });

    const emaiContact = {
      name: user.name,
      email: user.email,
    };
    const emailText = `Foi depositado R$ ${amount} em sua conta`;

    await this.sendEmailService.execute({
      to: emaiContact,
      subject: 'Depósito em conta',
      body: emailText,
    });

    return account;
  }
}
