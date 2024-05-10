import { TransferType } from '../../domain/models/ITransfer';
import FakeTransfersRepository from '../../domain/repositories/fakes/FakeTransfersRepository';
import BitcoinBalanceService from '../BitcoinBalanceService';
import FakeCheckQuoteBitcoinService from '../fakes/FakeCheckBitcoinService';

describe('BitcoinBalanceService', () => {
  let transfersRepository: FakeTransfersRepository;
  let checkBitcoinService: FakeCheckQuoteBitcoinService;
  let bitcoinBalanceService: BitcoinBalanceService;

  beforeEach(async () => {
    transfersRepository = new FakeTransfersRepository();
    checkBitcoinService = new FakeCheckQuoteBitcoinService();
    bitcoinBalanceService = new BitcoinBalanceService(
      checkBitcoinService,
      transfersRepository,
    );

    await transfersRepository.create({
      amount: 1000,
      bitcoin_quantity: 1,
      bitcoin_value: 1000,
      user_id: 1,
      type: TransferType.PURCHASE,
    });
  });

  it('It shoulds return users bitcoin balance', async () => {
    const bitcoinBalance = await bitcoinBalanceService.execute({ userId: 1 });

    expect(bitcoinBalance.totalBitcoinQuantity).toEqual(1);
  });

  it('It shoulds return users bitcoin balance with sells', async () => {
    await transfersRepository.create({
      amount: 500,
      bitcoin_quantity: 0.5,
      bitcoin_value: 1000,
      user_id: 1,
      type: TransferType.SELL,
    });

    const bitcoinBalance = await bitcoinBalanceService.execute({ userId: 1 });

    expect(bitcoinBalance.totalBitcoinQuantity).toEqual(0.5);
  });

  it('It shoulds return 0 when users doesnt have transfers', async () => {
    const bitcoinBalance = await bitcoinBalanceService.execute({ userId: 2 });

    expect(bitcoinBalance.totalBitcoinQuantity).toEqual(0);
  });
});
