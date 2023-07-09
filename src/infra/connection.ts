import * as dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "gerenciamentodebolsas",
  password: "1234",
  port: 5432,
});

