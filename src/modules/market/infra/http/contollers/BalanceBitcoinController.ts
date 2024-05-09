import BitcoinBalanceService from '@modules/market/services/BitcoinBalanceService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class BalanceBitcoinController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userId = parseInt(request.user.id);
    const bitcoinBalanceService = container.resolve(BitcoinBalanceService);

    const bitcoinBalance = await bitcoinBalanceService.execute({ userId });

    return response.json(bitcoinBalance);
  }
}
