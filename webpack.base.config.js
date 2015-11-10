/* globals __dirname */

// the webpack config in this file also be used from gulp in /gulp/task/webpack.js

var path = require('path');

module.exports = {
    entry: {
        vendor: ['jquery'],
        app: ['./client/app/bootstrap.js'],
        bootstrapper: ['./client/bootstrapper/main.js'],
    },
    output: {
        path: path.resolve(__dirname, 'public'),

        // The output.path from the view of the Javascript / HTML page.
        publicPath: '/public/',
        filename: '[name].bundle.js',
    },
    // // tells webpack not to include jquery in the bundle
    // externals: {
    //     jquery: 'jQuery'
    // },
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
            { test: /\.(woff|svg|ttf|eot)([\?]?.*)$/, loader: 'file?name=[name].[ext]' },

            // images
            {
              test: /\.(jpe?g|png|gif)$/i,
              loaders: [
                'file?hash=sha256&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ]
            }
        ]
    },
};
