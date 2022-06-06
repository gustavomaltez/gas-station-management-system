import { Repository } from 'typeorm';

import { Administrator, Employee } from '../entities';
import { DuplicatedUserCredentials, InvalidUserCPF, InvalidUserEmail, InvalidUserEmailOrPassword } from '../errors';
import { hashedStringMatches, toArray } from '../utils';

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
export function validateCPFStructure(cpf: string){
  const cpfRegex = /^/;

  if (typeof cpf !== 'string' || !cpfRegex.test(cpf))
    throw new InvalidUserCPF(cpf);
}

/**
 * Validates if the provided email and cpf is not already in use. Throws an error if so.
 * 
 * @param repositoryOrRepositories The repository to be used to find the user.
 * @param email The email to be used to find an user.
 * @param cpf The cpf to be used to find an user.
 */
export async function validateDuplicatedUserByEmailOrCPF(
  repositoryOrRepositories: Repository<Employee | Administrator> | Repository<Employee | Administrator>[],
  email: string,
  cpf: string
) {
  const repositories = toArray(repositoryOrRepositories);

  const promisses = repositories.map(repository => repository.findOne({ where: { email, cpf } }));
  const users = await Promise.all(promisses);
  const userWithProvidedEmailAlreadyExists = users.some(user => !!user);

  if (userWithProvidedEmailAlreadyExists) throw new DuplicatedUserCredentials(email, cpf);
}

/**
 * Validates if an user exists.
 * 
 * @param user The user to be validated.
 */
export async function validateUser(user: Administrator | Employee | null) {
  if (!user) throw new InvalidUserEmailOrPassword();
}

/**
 * Checks if the provided user password matches the one stored in the database. Throws an error if not.
 * 
 * @param user The user to be validated.
 * @param providedPassword The provided password to try to match the user.
 */
export async function validateUserPassword(user: Administrator | Employee | null, providedPassword: string) {
  if (!user || !hashedStringMatches(user.password, providedPassword))
    throw new InvalidUserEmailOrPassword();
}