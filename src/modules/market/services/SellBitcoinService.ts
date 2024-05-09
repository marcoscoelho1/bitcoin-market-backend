import { injectable, inject } from 'tsyringe';
import { ITransfersRepository } from '../domain/repositories/ITransfersRepository';
import { ITransfer, TransferType } from '../domain/models/ITransfer';
import { IUserRepository } from '@modules/users/domain/repository/IUserRepository';
import AppError from '@shared/errors/AppError';
import { ICheckBitcoinService } from '../domain/services/ICheckQuoteBitcoinService';
import { IAccountRepository } from '@modules/account/domain/repository/IAccountRepository';
import { AccountType } from '@modules/account/domain/models/IAccount';
import { ISellBitcoin } from '../domain/models/ISellBitcoin';
import { IBitcoinBalanceService } from '../domain/services/IBitcoinBalanceService';

@injectable()
export default class SellBitcoinService {
  constructor(
    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository,
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('CheckQuoteBitcoinService')
    private checkBitcoinService: ICheckBitcoinService,
    @inject('BitcoinBalanceService')
    private bitcoinBalanceService: IBitcoinBalanceService,
    @inject('AccountRepository')
    private accountRepository: IAccountRepository,
  ) {}

  public async execute({ userId, amount }: ISellBitcoin): Promise<ITransfer> {
    const userExists = this.usersRepository.findById(userId);

    if (!userExists) {
      throw new AppError('User does not exists');
    }

    const balanceBitcoin = await this.bitcoinBalanceService.execute({ userId });

    if (amount > balanceBitcoin.totalValueBitcoin) {
      throw new AppError('Amount is bigger then your amount Bitcoin balance');
    }

    const { sell } = await this.checkBitcoinService.execute();

    const bitcoinQuantity = amount / sell;

    const transfer = await this.transfersRepository.create({
      user_id: userId,
      amount,
      bitcoin_quantity: bitcoinQuantity,
      bitcoin_value: sell,
      type: TransferType.SELL,
    });

    if (transfer) {
      await this.accountRepository.create({
        user_id: userId,
        amount: amount,
        type: AccountType.DEPOSIT,
      });
    }

    return transfer;
  }
}
