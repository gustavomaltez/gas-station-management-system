import { EntityTarget, Repository } from 'typeorm';

/**
 * Represents a database instance. 
 */
export interface Database {
  /**
   * Returns a repository instance for the given entity.
   * 
   * @param entity The entity associated to the repository to be retrieved.
   * @returns The repository instance.
   */
  getRepository<EntityType>(entity: EntityTarget<EntityType>): Promise<Repository<EntityType>>;
  
  /**
   * Runs a query on the database and returns the result.
   * 
   * @param query The query to be executed.
   * @returns The result of the query.
   */
  runQuery(query: string): Promise<unknown>;
}