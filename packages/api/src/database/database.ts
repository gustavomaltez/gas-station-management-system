import { DataSource, EntityTarget } from 'typeorm';

import { sqliteDataSource } from './datasources';
import { Database as IDatabase } from './types';

const DEFAULT_DATABASE_CONNECTION_TRY_COUNT = 3;

/**
 * Default database handler.
 * 
 * - This class uses the TypeORM to connect to the database. 
 * - You can use different databases by changing the data source. 
 * - All databases operations MUST use instances of this class. 
 * - You can create your database instance at the end of this file, but remember 
 * to make only one exportation called `database`.
 * - This class is a singleton and must never be exported, only it's instancies.
 * 
 * See all the available database supported types in: 
 * @see https://typeorm.io/data-source-options
 */
class Database implements IDatabase {

  private isLoading = false;
  private isReady = false;
  private connectionTryCount = 0;

  constructor(private readonly dataSource: DataSource) {
    void this.initialize();
  }

  // Public methods ------------------------------------------------------------

  getRepository<EntityType>(entity: EntityTarget<EntityType>) {
    return this.dataSource.getRepository<EntityType>(entity);
  }

  // Helper methods ------------------------------------------------------------

  private async initialize(): Promise<void> {
    if (this.isLoading || this.isReady) return;
    this.isLoading = true;

    this.connectionTryCount = this.connectionTryCount + 1;

    try {
      await this.dataSource.initialize();
      this.isReady = true;
    } catch (error) {
      if (this.connectionTryCount > DEFAULT_DATABASE_CONNECTION_TRY_COUNT)
        throw new Error(`Failed to initialize database connection: ${error}`);
      return this.initialize();
    }
  }
}

// Different database creations ------------------------------------------------

const sqliteDatabase = new Database(sqliteDataSource);

// Default export --------------------------------------------------------------

export const database = sqliteDatabase;