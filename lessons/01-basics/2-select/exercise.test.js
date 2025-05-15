import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { selectAccounts } from './exercise.js';

describe('select accounts', { concurrency: true }, () => {
  it('should return first 10 customers with customer id, number of accounts and total balance in Agra branch for customers with more than 1 lakh total balance in Agra branch ordered by customer id lowest first', async () => {
    const expectedValues = [
      { customer_id: 9, count: '1', sum: '651664.58' },
      { customer_id: 44, count: '1', sum: '5864069.88' },
      { customer_id: 55, count: '1', sum: '1727307.16' },
      { customer_id: 60, count: '1', sum: '2919436.34' },
      { customer_id: 62, count: '1', sum: '8429518.19' },
      { customer_id: 74, count: '1', sum: '8500711.72' },
      { customer_id: 76, count: '2', sum: '876545.65' },
      { customer_id: 83, count: '1', sum: '6919075.93' },
      { customer_id: 84, count: '1', sum: '9719846.57' },
      { customer_id: 86, count: '1', sum: '8660682.81' },
    ];
    const result = await selectAccounts();
    assert.deepEqual(result, expectedValues);
  });
});
