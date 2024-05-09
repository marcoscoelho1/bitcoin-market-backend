import CheckTransfersHistoricService from '@modules/market/services/CheckTransfersHistoricService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TransfersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userId = parseInt(request.user.id);
    const checkTransfersHistoric = container.resolve(
      CheckTransfersHistoricService,
    );

    const transfers = await checkTransfersHistoric.execute(userId);

    return response.json(transfers);
  }
}
