import jwt from 'jsonwebtoken';

import { Administrator, Employee } from '../entities';

/**
 * Generates a string token associated to the provided user.
 * 
 * @param user The user data to generate the token for
 * @returns A string token associated to the provided user
 */
export function generateUserAccessToken(user: Employee | Administrator): string {
  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  const payload = { id: user.id };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}