import { Employee } from '../entities';
import { EmployeeRepository } from '../repositories/Employee.repository';
import { hashString } from '../utils';
import { validateCPFStructure, validateEmailStructure } from '../validators';

// DTO's -----------------------------------------------------------------------

interface CreateUserDTO {
  // Shared properties
  cpf: string;
  name: string;
  email: string;
  password: string;

  // Specification properties
  salary: number;
  isAdminRoot: boolean;

  // Other properties
  type: 'admin' | 'employee';
}

interface UserTokens {
  accessToken: string;
  refreshToken: string;
}

// Abstraction -----------------------------------------------------------------

/**
 * @abstract Abstract implementation of the authentication service.
 * All authentication services *MUST* extend this class.
 */
export abstract class AuthenticationService {


  constructor(protected readonly repository: EmployeeRepository) { }

  /**
   * Creates a new user entry into database.
   * 
   * @param user The user to be created into the database.
   */
  abstract createUser(user: CreateUserDTO): Promise<Employee>;

  /**
   * Authenticates a user and returns the authentication token
   * 
   * @param email The user email.
   * @param password The user password.
   */
  abstract login(email: string, password: string): Promise<UserTokens>;

  // Protected utility methods -------------------------------------------------

  /**
   * Hashes the user password and returns the provided user data with the hashed password
   * 
   * @param user The user data used to create a user
   * @returns The same user data but with the password hashed
   */
  protected hashUserPassword(user: CreateUserDTO): CreateUserDTO {
    return {
      ...user,
      password: hashString(user.password)
    };
  }

  /**
   * Validates if the user data follow the standards for email and cpf
   * 
   * @param user The user data to be validated.
   */
  protected validateUserDataStructure({ email, cpf }: CreateUserDTO): void {
    validateEmailStructure(email);
    validateCPFStructure(cpf);
  }
}

// Implementations -------------------------------------------------------------

export class DefaultAuthenticationService extends AuthenticationService {

  constructor(protected readonly repository: EmployeeRepository) {
    super(repository);

    // Methods binding ---------------------------------------------------------

    this.createUser = this.createUser.bind(this);
    this.hashUserPassword = this.hashUserPassword.bind(this);
    this.validateUserDataStructure = this.validateUserDataStructure.bind(this);
  }

  async createUser(data: CreateUserDTO): Promise<Employee> {
    this.validateUserDataStructure(data);
    const user = new Employee({
      address: {
        number: 1,
        postalCode: '01001000',
        street: 'Rua Teste'
      },
      cpf: data.cpf,
      email: data.email,
      name: data.name,
      password: hashString(data.password),
      salary: data.salary,
      isAdminUser: data.isAdminRoot
    });
    // ToDo:return user without sensitive data
    return this.repository.create(user);
  }

  async login(email: string, password: string): Promise<UserTokens> {
    // validateEmailStructure(email);
    // const user = await this.getUserByEmail(email);
    // const validUser = validateUser(user);
    // validateUserPassword(user, password);
    // return generateUserTokens(validUser);
    return Promise.resolve() as any as Promise<UserTokens>;
  }
}

