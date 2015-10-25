import angular from 'angular';

let that = angular.module('mainModule', []);

// export this module to the outside world
export let mainModule = that;

that.run(
  function mainModuleRun() {
    console.log('the app is running');
  });
