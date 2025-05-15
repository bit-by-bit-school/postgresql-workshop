import 'dotenv/config';
import fs from 'fs/promises';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { from } from 'pg-copy-streams';
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

export function queryAsStream(client, queryText) {
  return client.query(from(queryText));
}

export async function loadCSVIntoPostgres(csvFilePath, tableName) {
  const copyQuery = `
  COPY ${tableName} FROM STDIN WITH (
    FORMAT CSV,
    HEADER true,
    DELIMITER ','
  )
`;
  try {
    const fileStream = createReadStream(csvFilePath);
    const client = await standardPool.connect();
    const pgStream = queryAsStream(client, copyQuery);
    await pipeline(fileStream, pgStream);
    console.log('CSV data copy completed successfully');
  } catch (e) {
    console.error('Error during copy:', e);
  }
}
