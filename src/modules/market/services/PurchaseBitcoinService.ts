import { injectable, inject } from 'tsyringe';
import { ITransfersRepository } from '../domain/repositories/ITransfersRepository';
import { ITransfer, TransferType } from '../domain/models/ITransfer';
import { IUserRepository } from '@modules/users/domain/repository/IUserRepository';
import { IPurchaseBitcoin } from '../domain/models/IPurchaseBitcoin';
import AppError from '@shared/errors/AppError';
import { ICheckBitcoinService } from '../domain/services/ICheckQuoteBitcoinService';
import { ICheckBalanceService } from '@modules/account/domain/services/ICheckBalanceService';
import { IAccountRepository } from '@modules/account/domain/repository/IAccountRepository';
import { AccountType } from '@modules/account/domain/models/IAccount';

@injectable()
export default class PurchaseBitcoinService {
  constructor(
    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository,
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('CheckQuoteBitcoinService')
    private checkBitcoinService: ICheckBitcoinService,
    @inject('CheckBalanceService')
    private checkBalanceService: ICheckBalanceService,
    @inject('AccountRepository')
    private accountRepository: IAccountRepository,
  ) {}

  public async execute({
    userId,
    amount,
  }: IPurchaseBitcoin): Promise<ITransfer> {
    const userExists = this.usersRepository.findById(userId);

    if (!userExists) {
      throw new AppError('User does not exists');
    }

    const balance = await this.checkBalanceService.execute({ userId });

    if (amount > balance.totalAmount) {
      throw new AppError('Amount is bigger then your balance');
    }

    const { buy } = await this.checkBitcoinService.execute();

    const bitcoinQuantity = amount / buy;

    const transfer = await this.transfersRepository.create({
      user_id: userId,
      amount,
      bitcoin_quantity: bitcoinQuantity,
      bitcoin_value: buy,
      type: TransferType.PURCHASE,
    });

    if (transfer) {
      await this.accountRepository.create({
        user_id: userId,
        amount: amount,
        type: AccountType.WITHDRAW,
      });
    }

    return transfer;
  }
}
