const fs = require('fs');
const path = require('path');

// create stubs for both firestore and auth to satisfy source-map-loader
const stubs = [
  path.join(__dirname, '..', 'node_modules', 'firebase', 'firestore', 'dist', 'esm', 'index.esm.js.map'),
  path.join(__dirname, '..', 'node_modules', 'firebase', 'auth', 'dist', 'esm', 'index.esm.js.map')
];

const payload = JSON.stringify({ version: 3, file: 'index.esm.js', sources: [], names: [], mappings: '' });

let failed = false;
for (const targetPath of stubs) {
  try {
    const dirPath = path.dirname(targetPath);
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(targetPath, payload + '\n', { encoding: 'utf8' });
    console.log('Firebase sourcemap stub created at', targetPath);
  } catch (err) {
    console.error('Failed to create firebase sourcemap stub at', targetPath, err);
    failed = true;
  }
}
if (failed) process.exitCode = 1;
