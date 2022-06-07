import { Repository } from 'typeorm';

import { Database } from '../database';
import { Administrator, Employee } from '../entities';
import { hashString } from '../utils';
import {
  validateCPFStructure,
  validateDuplicatedUserByEmailOrCPF,
  validateEmailStructure,
  validateUser,
  validateUserPassword,
} from '../validators';

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
  abstract createUser(user: CreateUserDTO): Promise<Administrator | Employee>;
  
  /**
   * Authenticates a user and returns the authentication token
   * 
   * @param email The user email.
   * @param password The user password.
   */
  abstract login(email: string, password: string): Promise<string>;
  
  // Protected utility methods -------------------------------------------------

  /**
   * Hashes the user passord and returns the provided user data with the hashed password
   * 
   * @param user The user data used to create a user
   * @returns The same user data but with the password hased
   */
  protected hashUserPassword(user: CreateUserDTO): CreateUserDTO {
    return {
      ...user,
      password: hashString(user.password)
    };
  }

  /**
   * Validates if the user data follow the standarts for email and cpf
   * 
   * @param user The user data to be validated.
   */
  protected validateUserDataStructure({ email, cpf }: CreateUserDTO): void {
    validateEmailStructure(email);
    validateCPFStructure(cpf);
  }

  /**
   * Validates if there is no used already registrated with the providaded user data
   * 
   * @param user The user data to be validated
   */
  protected async validateDuplicatedUserData(user: CreateUserDTO): Promise<void> {
    const promises = [this.database.getRepository(Administrator), this.database.getRepository(Employee)];
    const repositories = await Promise.all(promises);
    await validateDuplicatedUserByEmailOrCPF(repositories, user.email, user.cpf);
  }

  /**
   * Saves the user into database
   * 
   * - This method creates either an `Administrator` or an `Employee` depending on the user type
   * 
   * @param user The user data to be saved into database.
   * @returns The instance of the just created user.
   */
  protected async saveUserDataIntoDatabase(user: CreateUserDTO): Promise<Administrator | Employee> {
    const { getRepository } = this.database;

    const isAdmin = user.type === 'admin';
    const promise = (isAdmin ? getRepository(Administrator) : getRepository(Employee));
    const repository = await promise as Repository<Administrator | Employee>;
    return await repository.save(this.hashUserPassword(user));
  }
  
  /**
   * Searches into the Employee and Admin repositories respectively and returns
   * the first instances that matches the provided email
   * 
   * - Note: If for any reason exists an employee and a administrator with the 
   * same email, the returned instance will be the employee one.
   * 
   * @param email The user email to search by.
   * @returns An instance of the Administrator or Employee. Returns null if no one is found.
   */
  protected async getUserByEmail(email: string): Promise<Administrator | Employee | null> {
    const promises = [this.database.getRepository(Employee), this.database.getRepository(Administrator)];
    const repositories = await Promise.all(promises);
    const employee = await repositories[0].findOne({ where: { email } });
    if(employee) return employee;
    return await repositories[1].findOne({ where: { email } });
  }
}

// Implementations -------------------------------------------------------------

export class DefaultAuthenticationService extends AuthenticationService {

  constructor(protected readonly database: Database) {
    super(database);

    // Methods binding ---------------------------------------------------------

    this.createUser = this.createUser.bind(this);
    this.hashUserPassword = this.hashUserPassword.bind(this);
    this.validateDuplicatedUserData = this.validateDuplicatedUserData.bind(this);
    this.saveUserDataIntoDatabase = this.saveUserDataIntoDatabase.bind(this);
    this.validateUserDataStructure = this.validateUserDataStructure.bind(this);
    this.getUserByEmail = this.getUserByEmail.bind(this);
  }

  async createUser(data: CreateUserDTO): Promise<Administrator | Employee> {
    this.validateUserDataStructure(data);
    await this.validateDuplicatedUserData(data);
    const user = await this.saveUserDataIntoDatabase(data);
    // ToDo:return user without sensitive data
    return user;
  }

  async login(email: string, password: string): Promise<string> {
    validateEmailStructure(email);
    const user = await this.getUserByEmail(email);
    validateUser(user);
    validateUserPassword(user, password);
    return 'fake-token';
  }
}

