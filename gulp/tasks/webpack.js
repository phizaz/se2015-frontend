var gulp = require('gulp');
var gutil = require('gutil');
var webpackStream = require('webpack-stream');
var notifier = require('node-notifier');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var developmentConfig = require('../../webpack.development.config');
var productionConfig = require('../../webpack.production.config');

gulp.task('develop', ['clean:public', 'webpack:devserver']);
gulp.task('deploy', ['clean:public', 'webpack:production']);

gulp.task('webpack:devserver',
  function webpackDevServer() {

    var compiler = webpack(developmentConfig);
    // default port is 3000
    var port = developmentConfig.devServer.port || 3000;

    new WebpackDevServer(compiler, developmentConfig.devServer)
      .listen(port, 'localhost',
        function (err) {
          if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
          }

          // server listening
          gutil.log("[webpack-dev-server is running]", "http://localhost:" + port + "/webpack-dev-server/index.html");
        });

  });

gulp.task('webpack:development',
  function webpackDevelopment() {

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
