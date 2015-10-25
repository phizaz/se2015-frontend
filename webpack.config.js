/* globals __dirname */

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
        loaders: [
            // babel (es6)
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
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
