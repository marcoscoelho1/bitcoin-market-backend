import { Request, Response } from 'express';
import CreateUserSevice from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserSevice);
    const user = await createUserService.execute({ name, email, password });

    return response.json(user);
  }
}
