import { IQuoteBitcoin } from '../domain/IQuoteBitcoin';
import AppError from '@shared/errors/AppError';
import { IHttpProvider } from '@shared/providers/HttpProvider/models/IHttpProvider';
import { inject, injectable } from 'tsyringe';
import { IBitcoinMarketResponse } from '../domain/IBitcoinMarketResponse';

@injectable()
export default class CheckQuoteBitcoinService {
  constructor(
    @inject('HttpProvider')
    private httpProvider: IHttpProvider,
  ) {}

  public async execute(): Promise<IQuoteBitcoin> {
    const data = await this.httpProvider.get<IBitcoinMarketResponse>(
      'https://www.mercadobitcoin.net/api/BTC/ticker/',
    );

    if (!data) {
      throw new AppError('Error on getting bitcoin quote.');
    }

    const quoteBitcoin = {
      buy: parseInt(data.ticker.buy),
      sell: parseInt(data.ticker.sell),
    };

    return quoteBitcoin;
  }
}
