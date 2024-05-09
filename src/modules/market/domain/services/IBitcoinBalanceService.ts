import { IBalanceBitcoin } from '../models/IBalanceBitcoin';

export interface IBitcoinBalanceParameters {
  userId: number;
}

export interface IBitcoinBalanceService {
  execute({ userId }: IBitcoinBalanceParameters): Promise<IBalanceBitcoin>;
}
