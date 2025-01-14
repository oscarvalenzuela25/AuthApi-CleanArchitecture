import { Router } from 'express';
import { AuthController } from './controller';
import { AuthRepositoryImplementation } from '../../infrastructure/repositories/authRepositoryImplementation';
import { AuthDatasourceImplementation } from '../../infrastructure/datasources/authDatasourceImplementation';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { RegisterUseCase } from '../../application/useCases/auth/registerUseCase';
import { LoginUseCase } from './../../application/useCases/auth/loginUseCase';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const dataBase = new AuthDatasourceImplementation();
    const authRepository = new AuthRepositoryImplementation(dataBase);
    const registerUseCase = new RegisterUseCase(authRepository);
    const loginUseCase = new LoginUseCase(authRepository);
    const controller = new AuthController(registerUseCase, loginUseCase);

    router.post(
      '/login',
      controller.loginUser.bind(controller),
      controller.loginUser
    );
    router.post(
      '/register',
      controller.registerUser.bind(controller),
      controller.registerUser
    );
    router.get(
      '/users',
      [AuthMiddleware.validateJwt],
      controller.getUsers.bind(controller),
      controller.getUsers
    );
    router.get(
      '/',
      [AuthMiddleware.validateJwt],
      controller.getUser.bind(controller),
      controller.getUser
    );

    return router;
  }
}
