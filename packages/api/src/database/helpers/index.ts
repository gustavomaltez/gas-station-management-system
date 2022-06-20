/**
 * This file contains helper function used to create the database schema.
 * 
 * - Those functions should not be used outside the database scope.
 */
import { Database } from '../types';

export async function initializeDatabaseSchema(query: Database['query']) {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      cpf VARCHAR(11),
      name VARCHAR(100),
      email VARCHAR(100),
      password VARCHAR(100),
      salary REAL,
      street VARCHAR(100),
      number REAL,
      postal_code VARCHAR(20)
    );
  `);
}