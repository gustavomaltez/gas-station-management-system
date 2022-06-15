import jwt from 'jsonwebtoken';

import { Administrator, Employee } from '../entities';

/**
 * Generates a string access token associated to the provided user.
 * 
 * @param user The user data to generate the token for
 * @returns A string token associated to the provided user
 */
export function generateUserAccessToken(user: Employee | Administrator): string {
  const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION_TIME } = process.env;
  const payload = { id: user.id };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET as string, {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME
  });
}

/**
 * Generates a string refresh token associated to the provided user.
 * 
 * @param user The user data to generate the token for
 * @returns A string token associated to the provided user
 */
export function generateUserRefreshToken(user: Employee | Administrator): string {
  const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION_TIME } = process.env;
  const payload = { id: user.id };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET as string, {
    expiresIn: REFRESH_TOKEN_EXPIRATION_TIME
  });
}