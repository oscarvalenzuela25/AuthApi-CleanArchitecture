import { Validators } from "../../../config/validators";

export class RegisterUserDTO {
  name: string = "";
  email: string = "";
  password: string = "";

  private constructor({ name, email, password }: Record<string, any>) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static create(object: Record<string, any>): [string?, RegisterUserDTO?] {
    const { name, email, password } = object;
    if (!name) return ["Name is required"];
    if (!email) return ["Email is required"];
    if (!Validators.email.test(email)) return ["Invalid email"];
    if (!password) return ["Password is required"];
    if (password.length < 6) return ["Password must be at least 6 characters"];

    return [, new RegisterUserDTO(object)];
  }
}
