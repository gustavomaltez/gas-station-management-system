import { Request, Response } from 'express';

import { AuthenticationService } from '../services';

export class AuthenticationController {

  constructor(private readonly service: AuthenticationService) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response) {
    const { name, email, password, cpf, isAdmin, isAdminRoot, salary } = req.body;
    const type = isAdmin ? 'admin' : 'employee';
    const user = await this.service.createUser({
      name, email, password, cpf, type, isAdminRoot, salary
    });
    res.status(200).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.service.login(email,password);
    res.status(200).json({ token });
  }
}