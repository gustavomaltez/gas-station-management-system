import { Database } from '../database';
import { User } from '../entities';
import { hashString } from '../utils';
import { validateDuplicatedUserByEmail, validateEmailStructure, validateUser, validateUserPassword } from '../validators';

// DTO's -----------------------------------------------------------------------

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

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

// Implementations -------------------------------------------------------------

export class DefaultAuthenticationService extends AuthenticationService {

  async createUser({ name, email, password }: CreateUserDTO): Promise<User> {
    const repository = this.database.getRepository(User);
    validateEmailStructure(email);
    await validateDuplicatedUserByEmail(repository, email);
    return repository.create({ name, email, password: hashString(password) });
  }

  async login(email: string, password: string): Promise<void> {
    const repository = this.database.getRepository(User);
    const user = await repository.findOne({ where: { email } });
    validateUser(user);
    validateUserPassword(user, password);
  }
}

