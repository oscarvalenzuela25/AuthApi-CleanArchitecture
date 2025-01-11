import { LoginUserDTO } from "../DTO/auth/loginUserDTO";
import { RegisterUserDTO } from "../DTO/auth/registerUserDTO";
import { UserEntity } from "../entities/userEntity";

export abstract class AuthRepository {
  abstract login(loginUserDTO: LoginUserDTO): Promise<UserEntity>;
  abstract register(registerUserDto: RegisterUserDTO): Promise<UserEntity>;
}
