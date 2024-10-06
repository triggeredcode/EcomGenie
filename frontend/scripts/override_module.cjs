const fs = require('fs');
const path = require('path');

// Path to the file you want to override
const targetPath = path.join(__dirname, '..', 'node_modules', '@copilotkit', 'shared', 'dist', 'chunk-ZUUDJSVP.mjs');

// Path to your override file
const overridePath = path.join(__dirname, 'mymodule.mjs');

// Copy the override file to the target location
fs.copyFileSync(overridePath, targetPath);

console.log('Module overridden successfully.');
