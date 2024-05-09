import { inject, injectable } from 'tsyringe';
import { ICheckBitcoinService } from '../domain/services/ICheckQuoteBitcoinService';
import { ITransfersRepository } from '../domain/repositories/ITransfersRepository';
import {
  IBitcoinBalanceParameters,
  IBitcoinBalanceService,
} from '../domain/services/IBitcoinBalanceService';
import { IBalanceBitcoin } from '../domain/models/IBalanceBitcoin';
import { TransferType } from '../domain/models/ITransfer';

@injectable()
export default class BitcoinBalanceService implements IBitcoinBalanceService {
  constructor(
    @inject('CheckQuoteBitcoinService')
    private checkBitcoinService: ICheckBitcoinService,
    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository,
  ) {}

  public async execute({
    userId,
  }: IBitcoinBalanceParameters): Promise<IBalanceBitcoin> {
    const transfers = await this.transfersRepository.findByUserId(userId);

    const totalBitcoinQuantity = transfers.reduce((total, tranfer) => {
      if (tranfer.type === TransferType.PURCHASE) {
        return total + tranfer.bitcoin_quantity;
      } else if (tranfer.type === TransferType.SELL) {
        return total - tranfer.bitcoin_quantity;
      }

      return total;
    }, 0);

    const { sell } = await this.checkBitcoinService.execute();

    return {
      totalBitcoinQuantity,
      totalValueBitcoin: totalBitcoinQuantity * sell,
    };
  }
}
