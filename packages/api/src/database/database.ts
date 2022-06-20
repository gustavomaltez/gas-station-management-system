import { EntityTarget } from 'typeorm';

import { defaultDataSource } from './datasources';
import { Database as IDatabase, DataSource } from './types';


class Database implements IDatabase {

  constructor(private readonly dataSource: DataSource) {
    this.dataSource.initialize();

    // Methods binding ---------------------------------------------------------
    this.query = this.query.bind(this);
    this.getCachedData = this.getCachedData.bind(this);
    this.getRepository = this.getRepository.bind(this);
  }

  // In-disk database methods --------------------------------------------------

  async query<Type>(query: string): Promise<Type[]> {
    await this.dataSource.initialize();
    return this.dataSource.database.query(query);
  }

  // In-memory database methods ------------------------------------------------

  async getCachedData(key: string): Promise<string | null> {
    await this.dataSource.initialize();
    return this.dataSource.cache.get(key);
  }

  async setCachedData(key: string, value: string): Promise<string | null> {
    await this.dataSource.initialize();
    return this.dataSource.cache.set(key, value);
  }

  async deleteCachedData(key: string): Promise<void> {
    await this.dataSource.initialize();
    return this.dataSource.cache.delete(key);
  }

  /**
   * @deprecated It will be removed soon.
   *  ToDo: Remove this method later
   */
  async getRepository<EntityType>(entity: EntityTarget<EntityType>) {
    return this.dataSource.database.getRepository<EntityType>(entity);
  }
}

// Different database creations ------------------------------------------------


const defaultDatabase = new Database(defaultDataSource);

// Default export --------------------------------------------------------------

export const database = defaultDatabase;