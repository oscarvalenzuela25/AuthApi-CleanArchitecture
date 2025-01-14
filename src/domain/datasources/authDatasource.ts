import { UserEntity } from '../entities/userEntity';

export abstract class AuthDatasource {
  abstract createUser(user: Partial<UserEntity>): Promise<UserEntity>;
  abstract findUser(where: Record<string, any>): Promise<UserEntity | null>;
  abstract findUsers(where: Record<string, any>): Promise<UserEntity[]>;
}
