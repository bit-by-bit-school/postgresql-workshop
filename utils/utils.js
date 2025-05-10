export function getCorrespondingSqlFilePath(filePath) {
  return filePath.replace(/js$/, 'sql');
}
