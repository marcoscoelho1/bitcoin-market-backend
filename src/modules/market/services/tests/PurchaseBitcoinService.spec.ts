import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repository/fakes/FakeUsersRepository';
import FakeTransfersRepository from '../../domain/repositories/fakes/FakeTransfersRepository';
import PurchaseBitcoinService from '../PurchaseBitcoinService';
import FakeCheckQuoteBitcoinService from '../fakes/FakeCheckBitcoinService';
import CheckBalanceService from '@modules/account/services/CheckBalanceService';
import FakeSendEmailService from '@shared/services/fakes/FakeSendEmailService';
import FakeAccountRepository from '@modules/account/domain/repository/fakes/FakeAccountRepository';
import { AccountType } from '@modules/account/domain/models/IAccount';
import AppError from '@shared/errors/AppError';

describe('PurchaseBitcoinService', () => {
  let transfersRepository: FakeTransfersRepository;
  let usersRepository: FakeUsersRepository;
  let accountRepository: FakeAccountRepository;
  let checkBitcoinService: FakeCheckQuoteBitcoinService;
  let checkBalanceService: CheckBalanceService;
  let sendEmailService: FakeSendEmailService;
  let purchaseBitcoinService: PurchaseBitcoinService;

  beforeEach(async () => {
    transfersRepository = new FakeTransfersRepository();
    usersRepository = new FakeUsersRepository();
    accountRepository = new FakeAccountRepository();
    checkBitcoinService = new FakeCheckQuoteBitcoinService();
    checkBalanceService = new CheckBalanceService(accountRepository);
    sendEmailService = new FakeSendEmailService();
    purchaseBitcoinService = new PurchaseBitcoinService(
      transfersRepository,
      usersRepository,
      checkBitcoinService,
      checkBalanceService,
      accountRepository,
      sendEmailService,
    );

    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@due.com',
      password: '123',
    });

    await accountRepository.create({
      user_id: 1,
      amount: 100,
      type: AccountType.DEPOSIT,
    });
  });

  it('Should purchase bitcoin', async () => {
    const transfer = await purchaseBitcoinService.execute({
      userId: 1,
      amount: 50,
    });

    expect(transfer.bitcoin_quantity).toEqual(0.05);
  });

  it('Should not purchase bitcoin if balance is not enought', async () => {
    expect(
      purchaseBitcoinService.execute({
        userId: 1,
        amount: 1000,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not purchase bitcoin if users doesnt exists', async () => {
    expect(
      purchaseBitcoinService.execute({
        userId: 2,
        amount: 1000,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
