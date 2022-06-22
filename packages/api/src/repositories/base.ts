import { Database } from '../database';

export abstract class BaseRepository {
  constructor(protected readonly database: Database) { }
}