const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(__dirname, '..', 'src'), dist, { recursive: true });
console.log('Build complete: dist/');
