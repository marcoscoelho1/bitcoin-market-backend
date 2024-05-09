import { Request, Response } from 'express';
import PurchaseBitcoinService from '@modules/market/services/PurchaseBitcoinService';
import { container } from 'tsyringe';

export default class PurchaseBitcoinController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { amount } = request.body;
    const userId = parseInt(request.user.id);

    const purchaseBitcoinService = container.resolve(PurchaseBitcoinService);

    const transfer = await purchaseBitcoinService.execute({ userId, amount });

    return response.json(transfer);
  }
}
