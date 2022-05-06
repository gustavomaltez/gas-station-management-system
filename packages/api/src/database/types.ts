import { EntityTarget, Repository } from 'typeorm';

/**
 * Represents a database instance. 
 */
export interface Database {
  /**
   * Returns a repository instance for the given entity.
   * 
   * @param entity The entity associated to the repository to be retrieved.
   */
  getRepository<EntityType>(entity: EntityTarget<EntityType>): Repository<EntityType>;
}