import { Repository } from 'typeorm';
import { User } from '../entities';

/**
 * Validates if a email follows the standard (user@provider.something) and throws an error if not.
 * 
 * @param email The email to be validated.
 */
export function validateEmailStructure(email: string) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (typeof email !== 'string' || !emailRegex.test(email))
    throw new Error(`Invalid email: ${email}`);
}

/**
 * Validates if the provided email is not already in use. Throws an error if so.
 * 
 * @param repository The repository to be used to find the user.
 * @param email The email to be used to find the user.
 */
export async function validateDuplicatedUserByEmail(repository: Repository<User>, email: string) {
  const user = await repository.findOne({ where: { email } });
  if (user) throw new Error(`User with email ${email} already exists`);
}