import knex from 'knex';
import 'dotenv/config';

export const db = knex({
  client: 'pg',
  dialect: 'postgres',
  connection: {
    multipleStatements: true,
    connectionString: process.env.DATABASE_URL,
    timezone: 'utc',
  },
});
