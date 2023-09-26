import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

if(!process.env.DATABASE_URL){
 throw new Error('DATABASE_URL must be set in .env file')
}

export const db = drizzle(sql)
