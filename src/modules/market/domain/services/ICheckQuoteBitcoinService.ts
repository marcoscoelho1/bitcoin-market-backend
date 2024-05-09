import { IQuoteBitcoin } from '../models/IQuoteBitcoin';

export interface ICheckBitcoinService {
  execute(): Promise<IQuoteBitcoin>;
}
