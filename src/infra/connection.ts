import * as dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

// export const pool = new Pool({
//   user: "root",
//   host: "127.0.0.1",
//   database: "gerenciamentodebolsas",
//   password: "example",
//   port: 5432,
// });

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});

