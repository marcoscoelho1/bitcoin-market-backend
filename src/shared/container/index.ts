import { container } from 'tsyringe';

import { IUserRepository } from '@modules/users/domain/repository/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repository/UsersRepository';

import { IAccountRepository } from '@modules/account/domain/repository/IAccountRepository';
import AccountRepository from '@modules/account/infra/typeorm/repository/AccountRepository';

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
