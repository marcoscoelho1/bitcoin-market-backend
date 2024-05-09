import { container } from 'tsyringe';

import { IUserRepository } from '@modules/users/domain/repository/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repository/UsersRepository';

import { IAccountRepository } from '@modules/account/domain/repository/IAccountRepository';
import AccountRepository from '@modules/account/infra/typeorm/repository/AccountRepository';

import { ICheckBitcoinService } from '@modules/market/domain/services/ICheckQuoteBitcoinService';
import CheckQuoteBitcoinService from '@modules/market/services/CheckQuoteBitcoinService';

import { ICheckBalanceService } from '@modules/account/domain/services/ICheckBalanceService';
import CheckBalanceService from '@modules/account/services/CheckBalanceService';

import { ITransfersRepository } from '@modules/market/domain/repositories/ITransfersRepository';
import TransfersRepository from '@modules/market/infra/typeorm/repositories/TransfersRepository';

import '@modules/users/providers';
import '@shared/providers';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAccountRepository>(
  'AccountRepository',
  AccountRepository,
);

container.registerSingleton<ICheckBitcoinService>(
  'CheckQuoteBitcoinService',
  CheckQuoteBitcoinService,
);

container.registerSingleton<ICheckBalanceService>(
  'CheckBalanceService',
  CheckBalanceService,
);

container.registerSingleton<ITransfersRepository>(
  'TransfersRepository',
  TransfersRepository,
);
