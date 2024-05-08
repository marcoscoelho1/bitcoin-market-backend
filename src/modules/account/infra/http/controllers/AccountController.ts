import { AccountType } from '@modules/account/domain/models/IAccount';
import MakeDepositService from '@modules/account/services/MakeDepositService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AccountController {
  public async create(request: Request, response: Response) {
    const { amount } = request.body;
    const user_id = parseInt(request.user.id);

    const makeDepositService = container.resolve(MakeDepositService);
    const account = await makeDepositService.execute({
      user_id,
      amount,
      type: AccountType.DEPOSIT,
    });

    return response.json(account);
  }
}
