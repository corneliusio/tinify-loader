let fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    tinify = require('tinify'),
    {getOptions} = require('loader-utils');

const userhome = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
const apikeypath = path.join(userhome, '.tinypng');

module.exports = function(content, map, meta) {
    const done = this.async();
    const options = getOptions(this) || {};

    options.cache = options.cache || path.resolve('.cache/tinify');

    const checksum = crypto.createHash('sha1').update(content.toString('utf8')).digest('hex');
    const checksumfile = path.join(options.cache, checksum);

    if (fs.existsSync(checksumfile)) {
        fs.readFile(checksumfile, (error, body) => {
            return done(null, body);
        });
    } else {
        if (!options.apikey) {
            if (process.env.TINYPNG_KEY) {
                options.apikey = process.env.TINYPNG_KEY;
            } else if (fs.existsSync(apikeypath)) {
                options.apikey = fs.readFileSync(apikeypath, 'utf8').trim();
            }

            if (!options.apikey) {
                this.emitWarning(new Error('Tinify Loader: No API key provided for TinyPNG/TinyJPG. **Images not optimized**\nYou can find instructions on getting your API key at https://www.npmjs.com/package/tinify-loader'));

                return done(null, content);
            }
        }

        if (!fs.existsSync(options.cache)) {
            fs.mkdirSync(options.cache);
        }

        tinify.key = options.apikey;
        tinify.fromBuffer(content).toBuffer((error, body) => {
            if (error) {
                return done(new Error(`Tinify Loader: ${error.message}`));
            }

            fs.writeFile(checksumfile, body, err => console.log(err));

            return done(null, body);
        });
    }
};

module.exports.raw = true;
