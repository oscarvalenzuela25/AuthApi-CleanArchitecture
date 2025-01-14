import { Bcrypt } from '../../../config/bcrypt';
import { JwtAdapter } from '../../../config/jwt';
import { LoginUserDTO } from '../../../domain/DTO/auth/loginUserDTO';
import { UserEntity } from '../../../domain/entities/userEntity';
import { CustomError } from '../../../domain/errors/customError';
import { AuthRepositoryImplementation } from '../../../infrastructure/repositories/authRepositoryImplementation';

export class LoginUseCase {
  constructor(
    private authRepositoryImplementation: AuthRepositoryImplementation
  ) {}

  async execute(user: LoginUserDTO): Promise<{
    user: UserEntity;
    token: string | null | undefined;
  }> {
    try {
      const { email, password } = user;
      const findUser = await this.authRepositoryImplementation.findUser({
        email,
      });

      if (!findUser) {
        throw CustomError.notFound('User not found');
      }

      const validPassword = Bcrypt.compare(password, findUser.password);
      if (!validPassword) {
        throw CustomError.unAuthorized('Wrong password or email');
      }
      const token = await JwtAdapter.generateToken({ id: findUser.id });

      return {
        user: findUser,
        token,
      };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }
}
