import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUser } from '../models/IUser';

export interface IUserRepository {
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findById(id: number): Promise<User | undefined>;
}
