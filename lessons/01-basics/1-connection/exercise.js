import { queryFromFile } from '../../../utils/db.js';
import { getCorrespondingSqlFilePath } from '../../../utils/utils.js';

export async function testConnection(pool) {
  try {
    const response = await queryFromFile(
      getCorrespondingSqlFilePath(import.meta.dirname),
      pool
    );
    return response[0]['active'];
  } catch (e) {
    console.error(e);
    return 0;
  }
}
