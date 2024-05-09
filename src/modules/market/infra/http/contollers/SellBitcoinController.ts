import SellBitcoinService from '@modules/market/services/SellBitcoinService';
import { Request, Response } from 'express';

import { container } from 'tsyringe';

export default class SellBitcoinController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { amount } = request.body;
    const userId = parseInt(request.user.id);

    const sellBitcoinService = container.resolve(SellBitcoinService);

    const transfer = await sellBitcoinService.execute({ userId, amount });

    return response.json(transfer);
  }
}
