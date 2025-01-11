import { AuthDatasource } from "../../domain/datasources/authDatasource";
import { LoginUserDTO } from "../../domain/DTO/auth/loginUserDTO";
import { RegisterUserDTO } from "../../domain/DTO/auth/registerUserDTO";
import { UserEntity } from "../../domain/entities/userEntity";
import { AuthRepository } from "../../domain/repositories/authRepostory";

export class AuthRepositoryImplementation implements AuthRepository {
  constructor(private authDatasourceImp: AuthDatasource) {}

  register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
    return this.authDatasourceImp.register(registerUserDTO);
  }

  login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
    return this.authDatasourceImp.login(loginUserDTO);
  }
}
