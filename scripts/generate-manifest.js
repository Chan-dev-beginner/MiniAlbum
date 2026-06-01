const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');
const outFile = path.join(__dirname, '..', 'assets.json');

function isImage(name) {
  return /\.(jpe?g|png|gif|webp|svg)$/i.test(name);
}

try {
  const files = fs.readdirSync(assetsDir).filter((f) => fs.statSync(path.join(assetsDir, f)).isFile() && isImage(f));
  files.sort();
  fs.writeFileSync(outFile, JSON.stringify(files, null, 2));
  console.log(`Wrote ${files.length} files to assets.json`);
} catch (err) {
  console.error('Error generating manifest:', err.message);
  process.exitCode = 1;
}
