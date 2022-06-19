import path from 'path';
import * as redis from 'redis';
import { DataSource as TypeORMDataSource } from 'typeorm';

import { DataSource } from '../types';

// TypeORM Data Sources --------------------------------------------------------

export const sqliteDataSource = new TypeORMDataSource({
  type: 'sqlite',
  database: path.resolve(__dirname, '../../database.sqlite'),
  synchronize: true,
  entities: [path.resolve(__dirname, '../../entities/*.entity.ts')],
});

export const postgresDataSource = new TypeORMDataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  entities: [path.resolve(__dirname, '../../entities/*.entity.ts')],
});

// Redis Data Sources ----------------------------------------------------------

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

// Data Source Objects ---------------------------------------------------------

export const defaultDataSource: DataSource = {
  cache: {
    get: redisClient.get.bind(redisClient),
    set: redisClient.set.bind(redisClient),
    delete: async (key: string) => {
      const response = await redisClient.del(key);
      if (response === 0) throw new Error(`Unable to delete cached data for key: ${key}`);
    },
  },
  database: {
    query: postgresDataSource.query.bind(postgresDataSource),
    getRepository: postgresDataSource.getRepository.bind(postgresDataSource),
  },
  initialize: async () => {
    if (postgresDataSource.isInitialized) return;
    const promises = [
      postgresDataSource.initialize.bind(postgresDataSource),
      redisClient.connect.bind(redisClient),
    ];
    await Promise.all(promises);
  },
};