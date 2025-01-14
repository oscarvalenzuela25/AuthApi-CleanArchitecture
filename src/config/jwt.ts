import jwt from 'jsonwebtoken';
import { envs } from './env';

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = '2h'
  ): Promise<string | null | undefined> {
    return new Promise(resolve => {
      jwt.sign(
        payload,
        envs.JWT_SEED,
        {
          expiresIn: duration,
        },
        (err, token) => {
          if (err) {
            return resolve(null);
          } else {
            return resolve(token);
          }
        }
      );
    });
  }

  static async validateToken<T>(token: string): Promise<T | null> {
    return new Promise(resolve => {
      jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
        if (err) {
          return resolve(null);
        }
        return resolve(decoded as T);
      });
    });
  }
}
