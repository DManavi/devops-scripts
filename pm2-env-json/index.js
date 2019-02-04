/**
 * Set environment variables into PM2 environments
 */

const
    argv = require('yargs').argv,
    defaults = require("defaults"),
    prefix = argv.prefix || "ENV_",
    dest = argv.dest || "env",
    file = argv.file || "pm2.json",
    fs = require("fs"),
    output = {},
    keys = Object.keys(process.env);

// iterate all available keys
keys.map(key => {

    if (key.startsWith(prefix)) {

        output[dest] = output[dest] || {};

        // attach key/value pair to the output object
        output[dest][key.replace(prefix, "")] = process.env[key];
    }
});

let fileContent = JSON.parse(fs.readFileSync(file, 'utf8'));

fileContent[dest] = defaults(output[dest], fileContent[dest]);

fs.writeFileSync(file, JSON.stringify(fileContent), 'utf8');