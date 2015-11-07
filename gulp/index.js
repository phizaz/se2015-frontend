var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

// read all tasks and add to the gulp
var tasks = fs.readdirSync('./gulp/tasks/').filter(function (name) { return /(\.(js)$)/i.test(path.extname(name)); });
for (var i = 0; i < tasks.length; ++i) {
  require('./tasks/' + tasks[i]);
}

