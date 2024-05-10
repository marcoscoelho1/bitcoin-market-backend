import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../domain/repository/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from '../CreateSessionService';

describe('CreateSessionService', () => {
  let usersRepository: FakeUsersRepository;
  let hashProvider: FakeHashProvider;
  let createSessionService: CreateSessionService;

  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createSessionService = new CreateSessionService(
      usersRepository,
      hashProvider,
    );

    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@due.com',
      password: '123',
    });
  });

  it('Should create session', async () => {
    const userSession = await createSessionService.execute({
      email: 'jhon@due.com',
      password: '123',
    });

    expect(userSession).toHaveProperty('token');
  });

  it('Should not create session with whrong user email', async () => {
    expect(
      createSessionService.execute({
        email: 'jhon_cena@due.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create session with whrong password', async () => {
    expect(
      createSessionService.execute({
        email: 'jhon@due.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
