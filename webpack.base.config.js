/* globals __dirname */

// the webpack config in this file also be used from gulp in /gulp/task/webpack.js

var path = require('path');

module.exports = {
    // this will be use as proxy for development server
    // it will be called for backend
    baseUrl: 'http://angular-seed.dev',
    entry: {
        app: ['./client/app/bootstrap.js'],
    },
    output: {
        path: path.resolve(__dirname, 'public'),

        // The output.path from the view of the Javascript / HTML page.
        publicPath: '/public/',
        filename: '[name].bundle.js',
    },
    module: {
        // this will be extended in gulp/webpack
        loaders: []
    },
};
