import { container } from 'tsyringe';

import { IUserRepository } from '@modules/users/domain/repository/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repository/UsersRepository';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);
