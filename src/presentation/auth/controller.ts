import { Request, Response } from "express";
import { RegisterUserDTO } from "../../domain/DTO/auth/registerUserDTO";
import { AuthRepository } from "../../domain/repositories/authRepostory";

export class AuthController {
  constructor(private authRepositoryImp: AuthRepository) {}

  public registerUser(req: Request, res: Response) {
    const [error, user] = RegisterUserDTO.create(req.body);
    if (!error) {
      this.authRepositoryImp
        .register(user!)
        .then(newUser => res.status(200).json(newUser));
    } else {
      res.status(404).json({ error });
    }
  }

  loginUser(req: Request, res: Response) {
    res.json("Login");
  }
}
