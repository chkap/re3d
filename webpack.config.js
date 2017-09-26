/**
 * Created by chkap on 17-6-29.
 */


const path = require('path');

module.exports = {
    entry: './scripts/re3d.js',
    output: {
        library: 're3d',
        path: path.resolve(__dirname, 'dist'),
        filename: "re3d.js",
    }
};

