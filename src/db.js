import 'dotenv/config';
import Pool from 'pg-pool';

const pool = new Pool({
  connectionString: process.env.DB_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function query(sqlQuery, values) {
  const client = await pool.connect();
  try {
    const result = await client.query(sqlQuery, values);
    return result.rows;
  } finally {
    client.release();
  }
}
