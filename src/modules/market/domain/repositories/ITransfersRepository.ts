import { ITransfer } from '../models/ITransfer';
import { ITransferCreate } from '../models/ITransferCreate';

export interface ITransfersRepository {
  create(data: ITransferCreate): Promise<ITransfer>;
  findByUserId(userId: number): Promise<ITransfer[]>;
}
