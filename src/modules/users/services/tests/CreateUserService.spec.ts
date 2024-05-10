import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../domain/repository/fakes/FakeUsersRepository';
import CreateUserSevice from '../CreateUserService';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUserService', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let createUser: CreateUserSevice;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserSevice(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create user', async () => {
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhon@due.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user', async () => {
    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhon@due.com',
      password: '123',
    });

    expect(
      createUser.execute({
        name: 'Jhon Doe',
        email: 'jhon@due.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
