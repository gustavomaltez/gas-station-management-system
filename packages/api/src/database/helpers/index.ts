/**
 * This file contains helper function used to create the database schema.
 * 
 * - Those functions should not be used outside the database scope.
 */
import { Database } from '../types';

export async function initializeDatabaseSchema(query: Database['query']) {
  await query(`
    CREATE TABLE IF NOT EXISTS employee (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      cpf VARCHAR(14) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      salary REAL NOT NULL,
      address_street VARCHAR(100) NOT NULL,
      address_number REAL NOT NULL,
      address_postal_code VARCHAR(20) NOT NULL,
      is_admin BOOLEAN DEFAULT false
    );
    
    CREATE TABLE IF NOT EXISTS fuel (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      liters_available REAL NOT NULL,
      price_per_liter REAL NOT NULL,
      name VARCHAR(20) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS client (
      cpf VARCHAR(20) PRIMARY KEY UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      address_street VARCHAR(100) NOT NULL,
      address_number REAL NOT NULL,
      address_postal_code VARCHAR(20) NOT NULL,
      birth_date DATE NOT NULL,
      main_phone_number VARCHAR(20) NOT NULL,
      secondary_phone_number VARCHAR(20)
    );
    
    --CREATE TYPE vehicle_type AS ENUM ('car', 'motorcycle', 'truck', 'other');
    
    CREATE TABLE IF NOT EXISTS vehicle (
      registration_plate VARCHAR(20) PRIMARY KEY UNIQUE NOT NULL,
      type vehicle_type DEFAULT 'other',
      brand VARCHAR(20) NOT NULL,
      client_id VARCHAR(20) references client(cpf)
    );
    
    --CREATE TYPE payment_method AS ENUM ('money', 'credit_card');
    
    CREATE TABLE IF NOT EXISTS invoice (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      issuance_date DATE DEFAULT CURRENT_DATE,
      value REAL NOT NULL,
      payment_method payment_method NOT NULL,
      employee_id uuid references employee(id),
      fuel_id uuid references fuel(id),
      vehicle_id VARCHAR(20) references vehicle(registration_plate)
    );
  `);
}