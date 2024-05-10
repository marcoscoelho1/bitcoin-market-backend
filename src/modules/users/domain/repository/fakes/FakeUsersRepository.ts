import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUser } from '../../models/IUser';
import { IUserRepository } from '../IUserRepository';

export default class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = new User();

    user.id = 1;
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }
}
