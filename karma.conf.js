// Karma configuration
// Generated on Sun Sep 27 2015 13:42:07 GMT+0700 (ICT)
var _ = require('lodash');

var webpackConfig = _.clone(require('./webpack.development.config'));

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'client/app/**/*.spec.js',
    ],


    // list of files to exclude
    exclude: [
    ],

    webpack: _.extend(webpackConfig, {
        devtool: 'inline-source-map'
    }),

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'client/app/**/*.spec.js': ['webpack', 'sourcemap']
    },

    // plugins: [
    //     require("karma-webpack")
    // ],

    webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,


    // // this makes google chrome harder to be disconnected
    // browserNoActivityTimeout: 30000,
  });
};
