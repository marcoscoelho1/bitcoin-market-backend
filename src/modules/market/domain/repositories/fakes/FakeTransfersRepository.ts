import Transfer from '@modules/market/infra/typeorm/entities/Transfer';
import { ITransfer } from '../../models/ITransfer';
import { ITransfersRepository } from '../ITransfersRepository';
import { ITransferCreate } from '../../models/ITransferCreate';

export default class FakeTransfersRepository implements ITransfersRepository {
  private transfers: ITransfer[] = [];

  public async create(data: ITransferCreate): Promise<ITransfer> {
    const transfer = new Transfer();

    transfer.amount = data.amount;
    transfer.bitcoin_quantity = data.bitcoin_quantity;
    transfer.bitcoin_value = data.bitcoin_value;
    transfer.type = data.type;
    transfer.user_id = data.user_id;

    this.transfers.push(transfer);

    return transfer;
  }

  public async findByUserId(userId: number): Promise<ITransfer[]> {
    const filteredTransfers = this.transfers.filter(
      transfer => transfer.user_id === userId,
    );

    return filteredTransfers;
  }
}
