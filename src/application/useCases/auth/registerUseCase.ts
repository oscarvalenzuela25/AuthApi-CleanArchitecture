import { Bcrypt } from '../../../config/bcrypt';
import { Errors } from '../../../config/errors';
import { JwtAdapter } from '../../../config/jwt';
import { RegisterUserDTO } from '../../../domain/DTO/auth/registerUserDTO';
import { UserEntity } from '../../../domain/entities/userEntity';
import { CustomError } from '../../../domain/errors/customError';
import { AuthRepositoryImplementation } from './../../../infrastructure/repositories/authRepositoryImplementation';

export class RegisterUseCase {
  constructor(
    private authRepositoryImplementation: AuthRepositoryImplementation
  ) {}

  async execute(user: RegisterUserDTO): Promise<{
    user: UserEntity;
    token: string | null | undefined;
  }> {
    try {
      const { name, email, password } = user;
      const exist = await this.authRepositoryImplementation.findUser({ email });
      if (exist) {
        throw CustomError.badRequest('User already exists');
      }
      const passwordHashed = Bcrypt.hash(password);
      const newUser = await this.authRepositoryImplementation.createUser({
        name,
        email,
        password: passwordHashed,
      });
      const token = await JwtAdapter.generateToken({ id: newUser.id });

      return { user: newUser, token };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }
}
