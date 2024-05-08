import { container } from 'tsyringe';

import { IUserRepository } from '@modules/users/domain/repository/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repository/UsersRepository';

import '@modules/users/providers';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);
