import { Employee } from '../entities';
import { EmployeeRepository } from '../repositories/Employee.repository';
import { generateEmployeeTokens } from '../utils';
import {
  validateCPFStructure,
  validateDuplicatedEmployee,
  validateEmailStructure,
  validateRequiredObjectProperties,
} from '../validators';

// DTO's -----------------------------------------------------------------------

interface RegisterEmployeeDTO {
  cpf: string;
  name: string;
  email: string;
  password: string;
  salary: number;
  address: {
    street: string;
    postalCode: string;
    number: number;
  };
  isAdmin: boolean;
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
   * Registers a new employee
   * 
   * @param employee The employee data to be saved into the database.
   * @returns The employee access token and refresh token.
   */
  abstract register(employee: RegisterEmployeeDTO): Promise<UserTokens>;

  /**
   * Authenticates an employee and returns the authentication token
   * 
   * @param email The user email.
   * @param password The user password.
   */
  abstract login(email: string, password: string): Promise<UserTokens>;

  /**
   * Logout an employee by invalidating the employee tokens.
   * 
   * @param token An employee authentication token to be invalidated.
   */
  abstract logout(token: string): Promise<void>;
}

// Implementations -------------------------------------------------------------

export class DefaultAuthenticationService extends AuthenticationService {

  constructor(protected readonly repository: EmployeeRepository) {
    super(repository);

    // Methods binding ---------------------------------------------------------
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async register(data: RegisterEmployeeDTO): Promise<UserTokens> {

    validateRequiredObjectProperties("params", data, ['cpf', 'name', 'email', 'password', 'salary', 'isAdmin', 'address']);
    validateRequiredObjectProperties("address", data.address, ['street', 'postalCode', 'number']);

    const employee = new Employee(data);

    validateCPFStructure(employee.cpf);
    validateEmailStructure(employee.email);
    await validateDuplicatedEmployee(employee, this.repository);

    const createdEmployee = await this.repository.create(employee);
    return generateEmployeeTokens(createdEmployee);
  }

  async login(email: string, password: string): Promise<UserTokens> {
    // validateEmailStructure(email);
    // const user = await this.getUserByEmail(email);
    // const validUser = validateUser(user);
    // validateUserPassword(user, password);
    // return generateUserTokens(validUser);
    return Promise.resolve() as any as Promise<UserTokens>;
  }

  async logout(token: string): Promise<void> {
    return Promise.resolve();
  }
}
