export function downloadLocalFile(path: string, filename: string) {
  const a = document.createElement('a');
  a.href = path;
  a.download = filename;
  a.click();
  a.remove();
}
