import { AuthDatasource } from "../../domain/datasources/authDatasource";
import { LoginUserDTO } from "../../domain/DTO/auth/loginUserDTO";
import { RegisterUserDTO } from "../../domain/DTO/auth/registerUserDTO";
import { UserEntity } from "../../domain/entities/userEntity";
import { CustomError } from "../../domain/errors/customError";

export class AuthDatasourceImplementation implements AuthDatasource {
  async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
    const { name, email, password } = registerUserDTO;

    try {
      return new UserEntity(1, name, email, password, ["ADMIN_ROLE"]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }

  async login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
    const { email, password } = loginUserDTO;
    try {
      return new UserEntity(1, "name", email, password, ["ADMIN_ROLE"]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }
}
