import { Repository } from 'typeorm';

import { User } from '../entities';
import {
  DuplicatedUserEmail,
  InvalidUserEmail,
  InvalidUserEmailOrPassword,
} from '../errors';
import { hashedStringMatches } from '../utils';

// About the validators --------------------------------------------------------

/**
 * The only function of the validators in this file is to check if the provided
 * data follows some specific business rules. If so, then it will do nothing, 
 * otherwise it will throw an error. The bellow declared functions must never 
 * return values, only check the data integrity and throw errors for invalid data.
 */

// Validators ------------------------------------------------------------------

/**
 * Validates if a email follows the standard (user@provider.something) and throws an error if not.
 * 
 * @param email The email to be validated.
 */
export function validateEmailStructure(email: string) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (typeof email !== 'string' || !emailRegex.test(email))
    throw new InvalidUserEmail(email);
}

/**
 * Validates if the provided email is not already in use. Throws an error if so.
 * 
 * @param repository The repository to be used to find the user.
 * @param email The email to be used to find the user.
 */
export async function validateDuplicatedUserByEmail(repository: Repository<User>, email: string) {
  const user = await repository.findOne({ where: { email } });
  if (user) throw new DuplicatedUserEmail(email);
}

/**
 * Validates if an user exists.
 * 
 * @param user The user to be validated.
 */
export async function validateUser(user: User | null) {
  if (!user) throw new InvalidUserEmailOrPassword();
}

/**
 * Checks if the provided user password matches the one stored in the database. Throws an error if not.
 * 
 * @param user The user to be validated.
 * @param providedPassword The provided password to try to match the user.
 */
export async function validateUserPassword(user: User | null, providedPassword: string) {
  if (!user || !hashedStringMatches(user.password, providedPassword))
    throw new InvalidUserEmailOrPassword();
}