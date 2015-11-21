// This part should contains global configs
// Configures Providers. For example, $locationProvider.html5Mode(true);.

import angular from 'angular';
import 'angular-ui-router';

let that = angular.module('mainConfigModule', [
  'ui.router',
  ]);

export let mainConfigModule = that;

that.config(
  function mainConfigModule($urlRouterProvider) {
    // set fallback url
    $urlRouterProvider.otherwise('/');
  });

that.filter('range',
  () => {
    return (input, total) => {
      total = parseInt(total);

      for (var i=0; i<total; i++) {
        input.push(i);
      }

      return input;
    };
});
