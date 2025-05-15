import { loadCSVIntoPostgres, queryFromFile } from './utils/db.js';

const cwd = process.cwd();

await queryFromFile(`${cwd}/schema.sql`);
await loadCSVIntoPostgres(`${cwd}/data/customers.csv`, 'customers');
await loadCSVIntoPostgres(`${cwd}/data/branches.csv`, 'branches');
await loadCSVIntoPostgres(`${cwd}/data/accounts.csv`, 'accounts');
