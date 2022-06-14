import path from 'path';
import { DataSource } from 'typeorm';

export const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: path.resolve(__dirname, '../../database.sqlite'),
  synchronize: true,
  entities: [path.resolve(__dirname, '../../entities/*.entity.ts')],
});

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  entities: [path.resolve(__dirname, '../../entities/*.entity.ts')],
});