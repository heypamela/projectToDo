import dotenv from 'dotenv';
dotenv.config();

let db = {
  db: process.env.PG_DB as string,
  user: process.env.PG_USER as string,
  password: process.env.PG_PASSWORD as string,
  port: process.env.PG_PORT as string,
}

export { db }