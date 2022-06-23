import { Employee } from '../entities';
import { DuplicatedUserCredentials, InvalidUserCPF, InvalidUserEmail } from '../errors';
import { EmployeeRepository } from '../repositories/Employee.repository';
import { concatenateAndFormatStrings } from '../utils';

// About the validators --------------------------------------------------------

/**
 * The only function of the validators in this file is to check if the provided
 * data follows some specific business rules. If so, then it will do nothing, 
 * otherwise it will throw an error. The bellow declared functions must never 
 * return values, only check the data integrity and throw errors for invalid data.
 */

// Validators ------------------------------------------------------------------

/**
 * Validates if an email follows the standard (user@provider.something) and throws an error if not.
 * 
 * @param email The email to be validated.
 */
export function validateEmailStructure(email: string) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (typeof email !== 'string' || !emailRegex.test(email))
    throw new InvalidUserEmail(email);
}

/**
 * Validates if a cpf follows the standard (000.000.000-00) and throws an error if not.
 * 
 * @param cpf The cpf to be validated.
 */
export function validateCPFStructure(cpf: string) {
  const cpfRegex = /^/;

  if (typeof cpf !== 'string' || !cpfRegex.test(cpf))
    throw new InvalidUserCPF(cpf);
}

// /**
//  * Checks if the provided user password matches the one stored in the database. Throws an error if not.
//  * 
//  * @param user The user to be validated.
//  * @param password The provided password to try to match the user.
//  */
// export function validateUserPassword(user: Administrator | Employee | null, password: string) {
//   if (!user || !isValidString(password) || !hashedStringMatches(password, user.password))
//     throw new InvalidUserEmailOrPassword();
// }

/**
 * Checks if already exists an employee with the provided email or cpf. Throws an error if so.
 * 
 * @param employee The employee to be validated.
 * @param repository The repository to be used to find the employee.
 */
export async function validateDuplicatedEmployee(employee: Employee, repository: EmployeeRepository) {
  const isAlreadyInUse = await repository.emailOrCpfIsAlreadyInUse(employee.email, employee.cpf);
  if (isAlreadyInUse) throw new DuplicatedUserCredentials(employee.email, employee.cpf);
}

/**
 * For a given object, checks if the object has all the required properties. Throws an error if not.
 * 
 * @param objectName The name of the object to be validated.
 * @param object The object to be validated.
 * @param properties An list matching the required object properties.
 */
export function validateRequiredObjectProperties(
  objectName: string,
  object: any,
  properties: string[]
): void {
  const invalidProperties = properties.filter(property => !object[property]);
  if (invalidProperties.length === 0) return;
  const formattedInvalidProperties = concatenateAndFormatStrings(invalidProperties);
  // ToDo: create a new error type for this
  throw new Error(`The ${objectName} object have the following properties missing: ${formattedInvalidProperties}`);
}