import { TransferType } from '../../domain/models/ITransfer';
import FakeTransfersRepository from '../../domain/repositories/fakes/FakeTransfersRepository';
import CheckTransfersHistoricService from '../CheckTransfersHistoricService';

describe('CheckTransfersHistoricService', () => {
  let transfersRepository: FakeTransfersRepository;
  let checkTransfersHistoricService: CheckTransfersHistoricService;

  beforeEach(async () => {
    transfersRepository = new FakeTransfersRepository();
    checkTransfersHistoricService = new CheckTransfersHistoricService(
      transfersRepository,
    );

    await transfersRepository.create({
      amount: 1000,
      bitcoin_quantity: 1,
      bitcoin_value: 1000,
      user_id: 1,
      type: TransferType.PURCHASE,
    });

    await transfersRepository.create({
      amount: 1000,
      bitcoin_quantity: 1,
      bitcoin_value: 1000,
      user_id: 1,
      type: TransferType.PURCHASE,
    });
  });

  it('Should return users transfers historic', async () => {
    const userId = 1;
    const transfers = await checkTransfersHistoricService.execute(userId);

    expect(transfers).toHaveLength(2);
  });

  it('Should return empty array if user does not have transfers', async () => {
    const userId = 2;
    const transfers = await checkTransfersHistoricService.execute(userId);

    expect(transfers).toHaveLength(0);
  });
});
