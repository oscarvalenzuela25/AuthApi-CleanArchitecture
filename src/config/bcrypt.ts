import { compareSync, hashSync } from 'bcryptjs';

export class Bcrypt {
  static hash(password: string) {
    return hashSync(password);
  }

  static compare(password: string, passwordHashed: string) {
    return compareSync(password, passwordHashed);
  }
}
