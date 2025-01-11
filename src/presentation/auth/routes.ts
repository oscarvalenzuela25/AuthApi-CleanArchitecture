import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImplementation } from "../../infrastructure/repositories/authRepositoryImplementation";
import { AuthDatasourceImplementation } from "../../infrastructure/datasources/authDatasourceImplementation";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const db = new AuthDatasourceImplementation();
    const authRepository = new AuthRepositoryImplementation(db);
    const controller = new AuthController(authRepository);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    return router;
  }
}
