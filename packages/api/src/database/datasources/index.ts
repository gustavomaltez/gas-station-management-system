import path from 'path';
import { DataSource } from 'typeorm';

export const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: path.resolve(__dirname, '../../database.sqlite'),
  synchronize: true,
  entities: [path.resolve(__dirname, '../../entities/*.entity.ts')],
});