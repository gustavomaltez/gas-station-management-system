import jwt from 'jsonwebtoken';

import { Employee } from '../entities';

/**
 * Generates an access token associated to the provided employee.
 * 
 * @param employee The employee data to generate the token for.
 * @returns An access token associated to the provided employee.
 */
export function generateEmployeeAccessToken({ id }: Employee): string {
  const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION_TIME } = process.env;
  const payload = { id };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET as string, {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME
  });
}

/**
 * Generates a refresh token associated to the provided employee.
 * 
 * @param employee The employee data to generate the token for.
 * @returns A refresh token associated to the provided employee.
 */
export function generateEmployeeRefreshToken({ id }: Employee): string {
  const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION_TIME } = process.env;
  const payload = { id };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET as string, {
    expiresIn: REFRESH_TOKEN_EXPIRATION_TIME
  });
}

/**
 * Helper function to generate both access and refresh tokens for an employee.
 * 
 * @param employee The employee data to generate the token for.
 * @returns An object containing both the access and refresh tokens.
 */
export function generateEmployeeTokens(employee: Employee): {
  accessToken: string,
  refreshToken: string;
} {
  return {
    accessToken: generateEmployeeAccessToken(employee),
    refreshToken: generateEmployeeRefreshToken(employee)
  };
}