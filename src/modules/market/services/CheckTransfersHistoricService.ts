import { injectable, inject } from 'tsyringe';
import { ITransfer } from '../domain/models/ITransfer';
import { ITransfersRepository } from '../domain/repositories/ITransfersRepository';

@injectable()
export default class CheckTransfersHistoricService {
  constructor(
    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository,
  ) {}

  public async execute(userId: number): Promise<ITransfer[]> {
    const transfers = await this.transfersRepository.findByUserId(userId);

    return transfers;
  }
}
