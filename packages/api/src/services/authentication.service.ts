// Contract -------------------------------------------------------------------- 

import { getRepository } from '../database/database';
import { User } from '../entities';

/**
 * Represents the authentication service.
 * This interface should be implemented by all the types of authentication services.
 */
export interface AuthenticationService {
  createUser: (user: CreateUserDTO) => Promise<User>;
}

// DTO's -----------------------------------------------------------------------

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

// Implementations -------------------------------------------------------------

export class DefaultAuthenticationService implements AuthenticationService {

  createUser({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    return getRepository(User).save(user);
  }
}