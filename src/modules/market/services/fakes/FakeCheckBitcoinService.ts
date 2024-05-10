import { IQuoteBitcoin } from '../../domain/models/IQuoteBitcoin';

import { injectable } from 'tsyringe';

import { ICheckBitcoinService } from '../../domain/services/ICheckQuoteBitcoinService';

@injectable()
export default class FakeCheckQuoteBitcoinService
  implements ICheckBitcoinService
{
  constructor() {}

  public async execute(): Promise<IQuoteBitcoin> {
    const quoteBitcoin = {
      buy: 1000,
      sell: 1000,
    };

    return quoteBitcoin;
  }
}
