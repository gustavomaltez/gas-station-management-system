import express from 'express';

import { AuthenticationController } from '../controllers';
import { DefaultAuthenticationService } from '../services';

const authenticationRouter = express.Router();

const service = new DefaultAuthenticationService();
const controller = new AuthenticationController(service);

authenticationRouter.post('/register', controller.register);

authenticationRouter.post('/login', controller.login);

export { authenticationRouter };