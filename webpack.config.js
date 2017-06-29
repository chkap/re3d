/**
 * Created by chkap on 17-6-29.
 */


const path = require('path');

module.exports = {
    entry: './scripts/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "re3d_main.js",
    }
};

