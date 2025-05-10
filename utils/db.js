import 'dotenv/config';
import fs from 'fs/promises';
import Pool from 'pg-pool';

export function instantiatePool(connectionString = process.env.DB_URL) {
  return new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
}

const standardPool = instantiatePool();

export async function query(sqlQuery, pool = standardPool) {
  const client = await pool.connect();
  try {
    const result = await client.query(sqlQuery);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function queryFromFile(sqlFilePath, pool = standardPool) {
  const fileQuery = await fs.readFile(sqlFilePath, { encoding: 'utf-8' });
  return query(fileQuery, pool);
}

await queryFromFile('./seed.sql');
