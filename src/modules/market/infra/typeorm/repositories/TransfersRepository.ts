import { ITransfersRepository } from '@modules/market/domain/repositories/ITransfersRepository';
import { Repository, getRepository } from 'typeorm';
import Transfer from '../entities/Transfer';
import { ITransferCreate } from '@modules/market/domain/models/ITransferCreate';
import { ITransfer } from '@modules/market/domain/models/ITransfer';

export default class TransfersRepository implements ITransfersRepository {
  private ormRepository: Repository<Transfer>;

  constructor() {
    this.ormRepository = getRepository(Transfer);
  }

  public async create({
    user_id,
    amount,
    bitcoin_quantity,
    bitcoin_value,
    type,
  }: ITransferCreate): Promise<ITransfer> {
    const transfer = await this.ormRepository.create({
      amount,
      bitcoin_quantity,
      bitcoin_value,
      user_id,
      type,
    });
    await this.ormRepository.save(transfer);
    return transfer;
  }

  public async findByUserId(userId: number): Promise<ITransfer[]> {
    const transfers = await this.ormRepository.find({
      where: { user_id: userId },
    });
    return transfers;
  }
}
