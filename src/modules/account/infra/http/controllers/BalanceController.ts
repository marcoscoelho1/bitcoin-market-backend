import CheckBalanceService from '@modules/account/services/CheckBalanceService';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class BalanceController {
  public async index(request: Request, response: Response) {
    const userId = parseInt(request.user.id);
    const checkBalanceService = container.resolve(CheckBalanceService);
    const balance = await checkBalanceService.execute({ userId });

    return response.json(balance);
  }
}
