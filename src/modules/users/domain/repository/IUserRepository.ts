import { IUser } from '../models/IUser';

export interface IUserRepository {
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | undefined>;
}
