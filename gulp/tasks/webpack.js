var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var notifier = require('node-notifier');

var developmentConfig = require('../../webpack.development.config');
var productionConfig = require('../../webpack.production.config');

gulp.task('webpack:development',
  function webpackDevelopment() {

    console.log('developmentConfig:', developmentConfig);

    function compileDone(err, stats) {
      if (err) {
        console.error('err', err);
      }

      var compilationErrors = stats.compilation.errors;
      if (compilationErrors.length > 0) {
        console.log('Error!! =======================');
        compilationErrors.forEach(
          function eachError(error) {
            console.error(error.name);
            console.error(error.message);
          });
      }

      // console.info('stats', stats);

      var timeElapsed = stats.endTime - stats.startTime;
      var message = 'compilation is done.. ' + 'using: ' + timeElapsed / 1000.0 + ' s.';

      console.log('webpack:development' + message);

      notifier.notify({
        title: 'webpack:development',
        message: message
      });
    }

    return gulp
      .src('./client/app/bootstrap.js')
      .pipe(webpackStream(developmentConfig, null, compileDone))
      .pipe(gulp.dest('./public/'));
  });

gulp.task('webpack:production',
  function webpackProduction() {
    return gulp
      .src('./client/app/bootstrap.js')
      .pipe(webpackStream(productionConfig))
      .pipe(gulp.dest('./public/'));
  });
