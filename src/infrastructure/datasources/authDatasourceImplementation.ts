import { UserModel } from '../../data/mongodb/models/userModel';
import { AuthDatasource } from '../../domain/datasources/authDatasource';
import { UserEntity } from '../../domain/entities/userEntity';
import { CustomError } from '../../domain/errors/customError';
import { UserMapper } from '../mappers/userMapper';

export class AuthDatasourceImplementation implements AuthDatasource {
  async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const newUser = await UserModel.create(user);
      await newUser.save();
      return UserMapper.userEntityFromObject(newUser);
    } catch (error) {
      throw CustomError.internalServerError();
    }
  }

  async findUser(where: Record<string, any>): Promise<UserEntity | null> {
    try {
      const user = await UserModel.findOne(where);
      return user ? UserMapper.userEntityFromObject(user) : null;
    } catch (error) {
      throw CustomError.internalServerError();
    }
  }

  async findUsers(where: Record<string, any>): Promise<UserEntity[]> {
    try {
      const users = await UserModel.find(where);
      return users.map(user => UserMapper.userEntityFromObject(user));
    } catch (error) {
      throw CustomError.internalServerError();
    }
  }
}
