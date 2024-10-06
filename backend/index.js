const { exec } = require('child_process');

exec('node app.js', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error starting app.js: ${err}`);
        return;
    }
    console.log(`app.js output: ${stdout}`);
    console.error(`app.js errors: ${stderr}`);
});

exec('node server.mjs', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error starting server.js: ${err}`);
        return;
    }
    console.log(`server.js output: ${stdout}`);
    console.error(`server.js errors: ${stderr}`);
});
