import CheckQuoteBitcoinService from '@modules/market/services/CheckQuoteBitcoin';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class BitcoinQuoteController {
  public async index(request: Request, response: Response): Promise<Response> {
    const checkQuoteBitcoinService = container.resolve(
      CheckQuoteBitcoinService,
    );

    const bitcoinQuote = await checkQuoteBitcoinService.execute();

    return response.json(bitcoinQuote);
  }
}
