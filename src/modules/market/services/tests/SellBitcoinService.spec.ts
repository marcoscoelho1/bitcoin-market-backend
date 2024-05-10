import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repository/fakes/FakeUsersRepository';
import FakeTransfersRepository from '../../domain/repositories/fakes/FakeTransfersRepository';
import FakeCheckQuoteBitcoinService from '../fakes/FakeCheckBitcoinService';
import FakeSendEmailService from '@shared/services/fakes/FakeSendEmailService';
import FakeAccountRepository from '@modules/account/domain/repository/fakes/FakeAccountRepository';
import { AccountType } from '@modules/account/domain/models/IAccount';
import AppError from '@shared/errors/AppError';
import SellBitcoinService from '../SellBitcoinService';
import BitcoinBalanceService from '../BitcoinBalanceService';
import { TransferType } from '../../domain/models/ITransfer';

describe('SellBitcoinService', () => {
  let transfersRepository: FakeTransfersRepository;
  let usersRepository: FakeUsersRepository;
  let accountRepository: FakeAccountRepository;
  let checkBitcoinService: FakeCheckQuoteBitcoinService;
  let checkBitcoinBalanceService: BitcoinBalanceService;
  let sendEmailService: FakeSendEmailService;
  let sellBitcoinService: SellBitcoinService;

  beforeEach(async () => {
    transfersRepository = new FakeTransfersRepository();
    usersRepository = new FakeUsersRepository();
    accountRepository = new FakeAccountRepository();
    checkBitcoinService = new FakeCheckQuoteBitcoinService();
    checkBitcoinBalanceService = new BitcoinBalanceService(
      checkBitcoinService,
      transfersRepository,
    );
    sendEmailService = new FakeSendEmailService();
    sellBitcoinService = new SellBitcoinService(
      transfersRepository,
      usersRepository,
      checkBitcoinService,
      checkBitcoinBalanceService,
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

    await transfersRepository.create({
      amount: 1000,
      bitcoin_quantity: 1,
      bitcoin_value: 1000,
      user_id: 1,
      type: TransferType.PURCHASE,
    });
  });

  it('Should sell bitcoin', async () => {
    const transfer = await sellBitcoinService.execute({
      userId: 1,
      amount: 50,
    });

    expect(transfer.bitcoin_quantity).toEqual(0.05);
  });

  it('Should not sell bitcoin if balance is not enought', async () => {
    expect(
      sellBitcoinService.execute({
        userId: 1,
        amount: 5000,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not sell bitcoin if users doesnt exists', async () => {
    expect(
      sellBitcoinService.execute({
        userId: 2,
        amount: 1000,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
