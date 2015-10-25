/* globals __dirname */

// the webpack config in this file also be used from gulp in /gulp/task/webpack.js

var path = require('path');

module.exports = {
    entry: {
        app: ['./client/app/bootstrap.js'],
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/public/',
        filename: "[name].bundle.js",
    },
    module: {
        // this will be extended in gulp/webpack
        loader: []
    },
};
