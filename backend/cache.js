const fs = require('fs');
const cacheFile = 'cache.json';

let cacheData = {};

try {
    const cacheContent = fs.readFileSync(cacheFile, 'utf8');
    cacheData = JSON.parse(cacheContent);
} catch (err) {
    console.log('Cache file not found. Creating a new one.');
}

const cache = {
    get: (key) => {
        return cacheData[key];
    },
    set: (key, value) => {
        cacheData[key] = value;
        fs.writeFileSync(cacheFile, JSON.stringify(cacheData));
    },
    delete: (key) => {
        delete cacheData[key];
        fs.writeFileSync(cacheFile, JSON.stringify(cacheData));
    }
};

module.exports = cache;