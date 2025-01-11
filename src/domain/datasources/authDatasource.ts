import { LoginUserDTO } from "../DTO/auth/loginUserDTO";
import { RegisterUserDTO } from "../DTO/auth/registerUserDTO";
import { UserEntity } from "../entities/userEntity";

export abstract class AuthDatasource {
  abstract login(loginUserDTO: LoginUserDTO): Promise<UserEntity>;
  abstract register(registerUserDTO: RegisterUserDTO): Promise<UserEntity>;
}
