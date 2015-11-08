import angular from 'angular';
import 'angular-ui-router';

import homeTemplate from './home.template.html';

export let homeRouteModule = angular.module('homeRouteModule', [
  'ui.router']);

homeRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.home', {
        url: '/',
        template: homeTemplate,
        controller: function homeRouteController () {
          console.log('controller loaded!!');
        },
      });
  });
