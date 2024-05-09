import { injectable, inject } from 'tsyringe';
import { IAccountRepository } from '../domain/repository/IAccountRepository';
import { ICheckBalance } from '../domain/models/ICheckBalance';
import { IBalance } from '../domain/models/IBalance';
import { AccountType } from '../domain/models/IAccount';
import { ICheckBalanceService } from '../domain/services/ICheckBalanceService';

@injectable()
export default class CheckBalanceService implements ICheckBalanceService {
  constructor(
    @inject('AccountRepository')
    private accountRepository: IAccountRepository,
  ) {}

  public async execute({ userId }: ICheckBalance): Promise<IBalance> {
    const userAccount = await this.accountRepository.findByUserId(userId);

    const totalAmount = userAccount.reduce((total, account) => {
      if (account.type === AccountType.DEPOSIT) {
        return total + account.amount;
      } else if (account.type === AccountType.WITHDRAW) {
        return total - account.amount;
      }

      return total;
    }, 0);

    return { totalAmount };
  }
}
