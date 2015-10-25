var gulp = require('gulp');
var rimraf = require('rimraf');

gulp.task('clean:public',
  function cleanPublic(callback) {
    rimraf('./public/**/*', callback);
  });
