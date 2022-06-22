import { Pool as PostgresPool } from 'pg';
import * as redis from 'redis';

import { initializeDatabaseSchema } from '../helpers';
import { DataSource } from '../types';

// Database clients ------------------------------------------------------------

const postgresPool = new PostgresPool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

// Data Source Objects ---------------------------------------------------------

// ToDo: Remove it later
let _isDatabaseReady = false;

export const defaultDataSource: DataSource = {
  cache: {
    get: redisClient.get.bind(redisClient),
    set: redisClient.set.bind(redisClient),
    delete: async function (key: string) {
      const response = await redisClient.del(key);
      if (response === 0) throw new Error(`Unable to delete cached data for key: ${key}`);
    },
  },
  database: {
    query: async function <Type>(query: string, params?: (string | number | boolean)[]) {
      const result = await postgresPool.query(query, params);
      return result.rows as Type[];
    }
  },
  initialize: async function () {
    if (_isDatabaseReady) return;
    const promises = [
      postgresPool.connect.bind(postgresPool),
      redisClient.connect.bind(redisClient),
      initializeDatabaseSchema(this.database.query)
    ];
    _isDatabaseReady = true;
    await Promise.all(promises);
  },
};