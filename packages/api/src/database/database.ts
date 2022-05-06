import 'reflect-metadata';

import path from 'path';
import { DataSource, EntityTarget } from 'typeorm';

let _isLoading = false;
let _isReady = false;

const dataSource = new DataSource({
  type: 'sqlite',
  database: './database.sqlite',
  synchronize: true,
  entities: [path.resolve(__dirname, '../entities/*.entity.ts')],
});

// Public database methods -----------------------------------------------------

/**
 * Whether the database is ready.
 */
export function isReady() { return _isReady; }

/**
 * Initializes the database instance.
 */
export async function initialize() {
  if (_isLoading) throw new Error('Database is already loading.');
  if (_isReady) throw new Error('Database is already ready.');

  _startLoading();

  try {
    await dataSource.initialize();
    _getReady();
  } catch (error) {
    _getNotReady();
  }
}

/**
 * Retrieves the provided entity repository.
 * 
 * @param entity The entity to get the repository for.
 * @returns The entity repository.
 */
export function getRepository(entity: EntityTarget<unknown>) {
  if (!_isReady) throw new Error('Database is not ready.');
  return dataSource.getRepository(entity);
}

// Utility methods -------------------------------------------------------------

function _getReady() {
  _isLoading = false;
  _isReady = true;
}

function _getNotReady() {
  _isLoading = false;
  _isReady = false;
}

function _startLoading() {
  _isLoading = true;
  _isReady = false;
}

export default dataSource;