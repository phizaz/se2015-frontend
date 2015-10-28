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

        /**
         * default loaders
         * this will be extended in gulp/webpack
         */
        loaders: [

            // json loader
            { test: /\.json$/, loader: 'json' },

            // html loader
            // this also will load images as well (apply to all non-root images)
            { test: /\.html$/, loader: 'html' },

            // fonts
            { test: /\.(woff|ttf|eot)([\?]?.*)$/, loader: 'file-loader?name=[name].[ext]' },

            // images
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loaders: [
                'file?hash=sha256&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ]
            }
        ]
    },
};
