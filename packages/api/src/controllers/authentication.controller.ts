import { Request, Response } from 'express';
import { AuthenticationService } from '../services';

export class AuthenticationController {

  constructor(private readonly service: AuthenticationService) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    this.service.createUser({ name, email, password }).then(user => res.status(200).json(user));
  }

  login(req: Request, res: Response) {
    const { name, email, password } = req.body;

    res.status(200).json({ name, email, password });
  }
}