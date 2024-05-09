import { TransferType } from './ITransfer';

export interface ITransferCreate {
  user_id: number;
  amount: number;
  bitcoin_quantity: number;
  bitcoin_value: number;
  type: TransferType;
}
