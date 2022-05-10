import { Database } from '../database';
import { User } from '../entities';
import { UserRole } from '../entities/User.entity';
import { hashString } from '../utils';
import { validateDuplicatedUserByEmail, validateEmailStructure, validateUser, validateUserPassword } from '../validators';

// DTO's -----------------------------------------------------------------------

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
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

  /**
   * Creates an user instance from a user DTO.
   * 
   * @param data The user data to create a new user instance.
   * @returns The actual user instance.
   */
  protected createUserInstance(data: CreateUserDTO): User {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = hashString(data.password);
    user.role = data.isAdmin ? UserRole.admin : UserRole.employee;
    return user;
  }
}

// Implementations -------------------------------------------------------------

export class DefaultAuthenticationService extends AuthenticationService {

  async createUser(data: CreateUserDTO): Promise<User> {
    const repository = this.database.getRepository(User);
    validateEmailStructure(data.email);
    await validateDuplicatedUserByEmail(repository, data.email);
    const user = this.createUserInstance(data);
    return await repository.save(user);
  }

  async login(email: string, password: string): Promise<void> {
    const repository = this.database.getRepository(User);
    const user = await repository.findOne({ where: { email } });
    validateUser(user);
    validateUserPassword(user, password);
  }
}

