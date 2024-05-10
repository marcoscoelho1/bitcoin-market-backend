import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repository/IUserRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { IHashProvider } from '../providers/HashProvider/models/IHashPovider';

@injectable()
export default class CreateUserSevice {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}
