import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { instantiatePool } from '../../utils/db.js';
import { testConnection } from './1-connection.js';

describe('Database connection', { concurrency: true }, () => {
  it('should return 1 if database connection is established', async () => {
    const connected = await testConnection();
    assert.equal(connected, 1);
  });

  it('should return 0 if database connection is not established', async () => {
    const invalidPool = instantiatePool('invalidConnectionString');
    const connected = await testConnection(invalidPool);
    assert.equal(connected, 0);
  });
});
