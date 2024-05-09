import { ICheckBalance } from '../models/ICheckBalance';

interface ICheckBalanceResponse {
  totalAmount: number;
}

export interface ICheckBalanceService {
  execute({ userId }: ICheckBalance): Promise<ICheckBalanceResponse>;
}
