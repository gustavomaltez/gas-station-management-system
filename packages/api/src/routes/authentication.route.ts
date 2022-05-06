import express from 'express';

import { AuthenticationController } from '../controllers';
import { database } from '../database/database';
import { DefaultAuthenticationService } from '../services';

// Controller instantiation ----------------------------------------------------

const service = new DefaultAuthenticationService(database);
const controller = new AuthenticationController(service);

// Routing ---------------------------------------------------------------------

const authenticationRouter = express.Router();

authenticationRouter.post('/register', controller.register);
authenticationRouter.post('/login', controller.login);

export { authenticationRouter };