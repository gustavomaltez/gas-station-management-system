import { DataSource, EntityTarget } from 'typeorm';

import { sqliteDataSource } from './datasources';
import { Database as IDatabase } from './types';

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

  constructor(private readonly dataSource: DataSource) {
    this.dataSource.initialize();
    
    // Methods binding ---------------------------------------------------------
    this.getRepository = this.getRepository.bind(this);
  }

  // Public methods ------------------------------------------------------------

  async getRepository<EntityType>(entity: EntityTarget<EntityType>) {
    if(!this.dataSource.isInitialized) await this.dataSource.initialize();
    return this.dataSource.getRepository<EntityType>(entity);
  }
}

// Different database creations ------------------------------------------------

const sqliteDatabase = new Database(sqliteDataSource);

// Default export --------------------------------------------------------------

export const database = sqliteDatabase;