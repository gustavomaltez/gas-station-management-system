import { EntityTarget, Repository } from 'typeorm';

/**
 * Represents a database instance. 
 * 
 * - This is the actual database that will be exposed to the application.
 * - Any database operation MUST use a class that implements this interface.
 */
export interface Database {
  /**
   * Runs a query on the database and returns the result.
   * 
   * @param query The query to be executed.
   * @returns The result of the query.
   */
  query<Type>(query: string): Promise<Type>;

  /**
   * Queries the cached data for the given key and returns the result.
   * 
   * @param key The key of the cached data.
   * @returns The cached data.
   */
  getCachedData(key: string): Promise<string | null>;

  /**
   * Inserts the given data into the cache.
   * 
   * @param key The key of the cached data.
   * @param value The value associated to the key.
   */
  setCachedData(key: string, value: string): Promise<string | null>;

  /**
   * Deletes the cached data for the given key.
   * 
   * @param key The key of the cached data.
   */
  deleteCachedData(key: string): Promise<void>;

  /**
   * @deprecated It will be removed soon.
   * Returns a repository instance for the given entity.
   * 
   * @param entity The entity associated to the repository to be retrieved.
   * @returns The repository instance.
   */
  getRepository<EntityType>(entity: EntityTarget<EntityType>): Promise<Repository<EntityType>>;
}

/**
 * Represents a Data Source object that will be injected into the database class 
 * to allow manipulate data.
 * 
 * - If you want to use a different database, you can create a new data source
 * that follows the same interface and inject this data source into the database
 * class.
 */
export interface DataSource {
  /**
   * The cache database instance.
   */
  cache: CacheDataSource;

  /**
   * The in-disk database instance
   */
  database: DatabaseDataSource;

  /**
   * Method to be called to initialize both in-memory (cache) and in-disk 
   * (database) connections.
   * 
   * - This method should initialize both databases if are not initialized, 
   * otherwise, calling this method with both databases already initialized 
   * should not perform any action.
   */
  initialize(): Promise<void>;
}

/**
 * Represents a in-disk database instance.
 * 
 * - Any in-disk database MUST use this interface to connect to the Database class.
 */
export interface DatabaseDataSource {
  /**
   * Runs a query on the database and returns the result.
   * 
   * @param query The query to be executed.
   * @returns The result of the query.
   */
  query<Type>(query: string): Promise<Type>;

  /**
   * @deprecated It will be removed soon.
   * Returns a repository instance for the given entity.
   * 
   * @param entity The entity associated to the repository to be retrieved.
   * @returns The repository instance.
   */
  getRepository<EntityType>(entity: EntityTarget<EntityType>): Repository<EntityType>;
}

/**
 * Represents a in-memory database instance.
 * 
 * - Any in-memory database MUST use this interface to connect to the Database class.
 */
export interface CacheDataSource {
  /**
   * Queries the cached data for the given key and returns the result.
   * 
   * @param key The key of the cached data.
   * @returns The cached data.
   */
  get(key: string): Promise<string | null>;

  /**
   * Inserts the given data into the cache.
   * 
   * @param key The key of the cached data.
   * @param value The value associated to the key.
   */
  set(key: string, value: string): Promise<string | null>;

  /**
   * Deletes the cached data for the given key.
   * 
   * @param key The key of the cached data.
   */
  delete(key: string): Promise<void>;
}
