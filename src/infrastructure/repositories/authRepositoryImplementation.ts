import { AuthDatasource } from '../../domain/datasources/authDatasource';
import { UserEntity } from '../../domain/entities/userEntity';
import { AuthRepository } from '../../domain/repositories/authRepostory';

export class AuthRepositoryImplementation implements AuthRepository {
  constructor(private authDatasourceImp: AuthDatasource) {}

  createUser(user: Partial<UserEntity>): Promise<UserEntity> {
    return this.authDatasourceImp.createUser(user);
  }

  findUser(where: Record<string, any>): Promise<UserEntity | null> {
    return this.authDatasourceImp.findUser(where);
  }

  findUsers(where: Record<string, any>): Promise<UserEntity[]> {
    return this.authDatasourceImp.findUsers(where);
  }
}
