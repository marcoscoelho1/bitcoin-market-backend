import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repository/fakes/FakeUsersRepository';
import FakeAccountRepository from '../../domain/repository/fakes/FakeAccountRepository';
import MakeDepositService from '../MakeDepositService';

import { AccountType } from '../../domain/models/IAccount';
import AppError from '@shared/errors/AppError';
import FakeSendEmailService from '@shared/services/fakes/FakeSendEmailService';

describe('MakeDepositService', () => {
  let accountRepository: FakeAccountRepository;
  let usersRepository: FakeUsersRepository;
  let sendEmailService: FakeSendEmailService;
  let makeDepositService: MakeDepositService;

  beforeEach(async () => {
    accountRepository = new FakeAccountRepository();
    usersRepository = new FakeUsersRepository();
    sendEmailService = new FakeSendEmailService();
    makeDepositService = new MakeDepositService(
      accountRepository,
      usersRepository,
      sendEmailService,
    );

    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@due.com',
      password: '123',
    });
  });

  it('Should do a deposit', async () => {
    const deposit = await makeDepositService.execute({
      user_id: 1,
      amount: 10,
      type: AccountType.DEPOSIT,
    });

    expect(deposit.type).toEqual(AccountType.DEPOSIT);
  });

  it('Should not do a deposit if users doesn exists', async () => {
    expect(
      makeDepositService.execute({
        user_id: 2,
        amount: 10,
        type: AccountType.DEPOSIT,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
