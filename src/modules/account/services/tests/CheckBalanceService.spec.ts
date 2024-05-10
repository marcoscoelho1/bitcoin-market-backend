import { AccountType } from '../../domain/models/IAccount';
import FakeAccountRepository from '../../domain/repository/fakes/FakeAccountRepository';
import CheckBalanceService from '../CheckBalanceService';

describe('CheckBalanceService', () => {
  let accountRepository: FakeAccountRepository;
  let checkBalanceService: CheckBalanceService;

  beforeEach(async () => {
    accountRepository = new FakeAccountRepository();
    checkBalanceService = new CheckBalanceService(accountRepository);

    await accountRepository.create({
      user_id: 1,
      amount: 100,
      type: AccountType.DEPOSIT,
    });
  });

  it('Should return users balance total amount', async () => {
    const amount = await checkBalanceService.execute({ userId: 1 });

    expect(amount.totalAmount).toEqual(100);
  });

  it('Should return users balance total amount with withdraw', async () => {
    await accountRepository.create({
      user_id: 1,
      amount: 50,
      type: AccountType.WITHDRAW,
    });

    const amount = await checkBalanceService.execute({ userId: 1 });

    expect(amount.totalAmount).toEqual(50);
  });

  it('Should return zero when user does not have account', async () => {
    const amount = await checkBalanceService.execute({ userId: 2 });

    expect(amount.totalAmount).toEqual(0);
  });
});
