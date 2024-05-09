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
import { ISendEmailService } from '@shared/domain/services/ISendEmailService';

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
    @inject('SendEmailService')
    private sendEmailService: ISendEmailService,
  ) {}

  public async execute({ userId, amount }: ISellBitcoin): Promise<ITransfer> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
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

    const emaiContact = {
      name: user.name,
      email: user.email,
    };
    const emailText = `Voce vendeu ${bitcoinQuantity} bitcoins e recebeu em sua conta R$ ${amount}`;

    await this.sendEmailService.execute({
      to: emaiContact,
      subject: 'Compra de bitcoin',
      body: emailText,
    });

    return transfer;
  }
}
