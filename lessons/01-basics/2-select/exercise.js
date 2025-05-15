import { queryFromFile } from '../../../utils/db.js';
import { getCorrespondingSqlFilePath } from '../../../utils/utils.js';

export async function selectAccounts(pool) {
  try {
    const response = await queryFromFile(
      getCorrespondingSqlFilePath(import.meta.dirname),
      pool
    );
    return response;
  } catch (e) {
    return 0;
  }
}
