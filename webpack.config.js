/* globals __dirname */

var path = require('path');

module.exports = {
    entry: {
        app: ['./src/entry.js'],
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        publicPath: '/assets/',
        filename: "[name].bundle.js",
    },
    module: {
        loaders: [
            // css loader
            { test: /\.css$/, loader: ['style', 'css'] },
            // sass loader
            { test: /\.scss|\.sass$/, loader: ['style', 'css', 'sass'] },
            // json loader
            { test: /\.json$/, loader: ['json'] },
            // html loader
            { test: /\.html$/, loader: ['html'] },
        ]
    },
    devServer: {
        port: 3000,
        colors: true,
    }
};
