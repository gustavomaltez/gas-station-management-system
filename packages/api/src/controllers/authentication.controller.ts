import { Request, Response } from 'express';
import { AuthenticationService } from '../services';

export class AuthenticationController {

  constructor(private readonly service: AuthenticationService) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await this.service.createUser({ name, email, password });
    res.status(200).json(user);
  }

  login(req: Request, res: Response) {
    const { name, email, password } = req.body;

    res.status(200).json({ name, email, password });
  }
}