export class LoginUserDTO {
  private constructor(public email: string, public password: string) {}

  static execute(data: Record<string, any>): [string?, LoginUserDTO?] {
    const { email, password } = data;

    if (!email) return ["Email is required"];

    if (!password) return ["Password is required"];

    return [, new LoginUserDTO(email, password)];
  }
}
