var _ = require('lodash');

var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var notifier = require('node-notifier');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var webpackConfig = require('../../webpack.config');

gulp.task('webpack:development',
  function webpackDevelopment() {
    var webpackLoaders = [
      // babel (es6)
      {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
      },
      // css loader
      { test: /\.css$/, loader: 'style!css!autoprefixer?browsers=last 2 versions' },
      // sass loader
      { test: /\.scss|\.sass$/, loader: 'style!css!autoprefixer?browsers=last 2 versions!sass' },
      // json loader
      { test: /\.json$/, loader: 'json' },
      // html loader
      { test: /\.html$/, loader: 'html' },
    ];

    var developmentConfig = _.extend(webpackConfig, {
      watch: true,
      plugins: [
        new ngAnnotatePlugin()
      ]
    });
    developmentConfig.module.loaders = webpackLoaders;

    return gulp
      .src('./client/app/bootstrap.js')
      .pipe(webpackStream(developmentConfig
        ))
      .pipe(gulp.dest('./public/'));
  });

gulp.task('webpack:production',
  function webpackProduction() {
    var webpackLoadersWithMinification = [
      // babel (es6)
      {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
      },
      // css loader
      { test: /\.css$/, loader: 'style!css?minimize!autoprefixer?browsers=last 2 versions' },
      // sass loader
      { test: /\.scss|\.sass$/, loader: 'style!css?minimize!autoprefixer?browsers=last 2 versions!sass' },
      // json loader
      { test: /\.json$/, loader: 'json' },
      // html loader
      { test: /\.html$/, loader: 'html' },
    ];

    var productionConfig = _.extend(webpackConfig, {
      plugins: [
        // annotation is working
        new ngAnnotatePlugin(),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
      ]
    });
    productionConfig.module.loaders = webpackLoadersWithMinification;

    return gulp
      .src('./client/app/bootstrap.js')
      .pipe(webpackStream(productionConfig))
      .pipe(gulp.dest('./public/'));

    // function compileDone(err, stats) {
    //   if (err) {
    //     console.error('err', err);
    //   }

    //   console.log('webpack:production compilation is done...');
    //   notifier.notify({
    //     title: 'webpack:production',
    //     message: 'compilation is done'
    //   });
    // }
  });
