import angular from 'angular';
import 'angular-ui-router';

import navigatorTemplate from './navigator.template.html';

let that = angular.module('navigatorRouteModule', [ 'ui.router' ]);

export let navigatorRouteModule = that;

that.config(
  function navigatorRouteModuleConfig($stateProvider) {
    $stateProvider
      // login with facebook page
      .state('navigator', {
        url: '/',
        template: navigatorTemplate,
      });
  });
