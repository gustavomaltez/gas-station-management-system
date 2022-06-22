import express from 'express';

import { AuthenticationController } from '../controllers';
import { database } from '../database/database';
import { EmployeeRepository } from '../repositories/Employee.repository';
import { DefaultAuthenticationService } from '../services';

// Controller instantiation ----------------------------------------------------

const repository = new EmployeeRepository(database);
const service = new DefaultAuthenticationService(repository);
const controller = new AuthenticationController(service);

// Routing ---------------------------------------------------------------------

const authenticationRouter = express.Router();

authenticationRouter.post('/register', controller.register);
authenticationRouter.post('/login', controller.login);

export { authenticationRouter };
