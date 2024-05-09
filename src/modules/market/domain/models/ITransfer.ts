export interface ITransfer {
  id: number;
  user_id: number;
  amount: number;
  bitcoin_quantity: number;
  bitcoin_value: number;
  type: string;
  created_at: Date;
  updated_at: Date;
}

export enum TransferType {
  PURCHASE = 'purchase',
  SELL = 'sell',
}
