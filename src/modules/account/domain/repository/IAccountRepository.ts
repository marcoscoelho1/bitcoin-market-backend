import { IUser } from '@modules/users/domain/models/IUser';
import { IAccount } from '../models/IAccount';
import { ICreateAccount } from '../models/ICreateAccount';

export interface IAccountRepository {
  create(data: ICreateAccount): Promise<IAccount>;
  findByUserId(user_id: number): Promise<IAccount[]>;
}
