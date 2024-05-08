import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repository/IUserRepository';

@injectable()
export default class CreateUserSevice {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = await this.usersRepository.create({ name, email, password });
    return user;
  }
}
