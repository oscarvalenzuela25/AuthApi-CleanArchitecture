import { Request, Response } from 'express';
import { RegisterUserDTO } from '../../domain/DTO/auth/registerUserDTO';
import { UserModel } from '../../data/mongodb/models/userModel';
import { RegisterUseCase } from './../../application/useCases/auth/registerUseCase';
import { Errors } from '../../config/errors';
import { LoginUserDTO } from '../../domain/DTO/auth/loginUserDTO';
import { LoginUseCase } from './../../application/useCases/auth/loginUseCase';

export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase
  ) {}

  async registerUser(req: Request, res: Response) {
    try {
      const [error, user] = RegisterUserDTO.create(req.body);
      if (error) res.status(404).json({ error });

      const response = user && (await this.registerUseCase.execute(user));
      res.status(200).json(response);
    } catch (error) {
      Errors.handleError(error, res);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const [error, user] = LoginUserDTO.execute(req.body);
      if (error) res.status(404).json({ error });

      const response = user && (await this.loginUseCase.execute(user));
      res.status(200).json(response);
    } catch (error) {
      Errors.handleError(error, res);
    }
  }

  async getUsers(req: Request, res: Response) {
    const users = await UserModel.find();
    res.status(200).json({ users });
  }

  async getUser(req: Request, res: Response) {
    const user = req.body.client;
    res.status(200).json(user);
  }
}
