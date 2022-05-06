import { Database } from '../database';

import { User } from '../entities';

// Abstraction -----------------------------------------------------------------

/**
 * @abstract Abstract implementation of the authentication service.
 * All authentication services *MUST* extend this class.
 */
export abstract class AuthenticationService {

  /**
   * @param database An database instance.
   */
  constructor(protected readonly database: Database) { }

  /**
   * Creates a new user entry into database.
   * 
   * @param user The user to be created into the database.
   */
  abstract createUser(user: CreateUserDTO): Promise<User>;
}

// DTO's -----------------------------------------------------------------------

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

// Implementations -------------------------------------------------------------

export class DefaultAuthenticationService extends AuthenticationService {

  createUser({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    
    const userRepository = this.database.getRepository(User);
    return userRepository.save(user);
  }
}

