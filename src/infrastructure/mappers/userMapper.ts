import { UserEntity } from '../../domain/entities/userEntity';
import { CustomError } from '../../domain/errors/customError';

export class UserMapper {
  static userEntityFromObject(object: Record<string, any>) {
    const { id, _id, name, email, password, roles } = object;
    const newId = _id || id;
    if (!newId) {
      throw CustomError.badRequest('Id must not be passed');
    }

    if (!name) {
      throw CustomError.badRequest('Missing name');
    }

    if (!email) {
      throw CustomError.badRequest('Missing email');
    }

    if (!password) {
      throw CustomError.badRequest('Missing password');
    }

    if (!roles) {
      throw CustomError.badRequest('Missing roles');
    }

    return new UserEntity(newId, name, email, password, roles);
  }
}
