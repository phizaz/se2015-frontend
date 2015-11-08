import angular from 'angular';
import 'angular-ui-router';

import homeTemplate from './home.template.html';
import {homeControllerModule} from './home.controller.js';

export let homeRouteModule = angular.module('homeRouteModule', [
  'ui.router',
  homeControllerModule.name]);

homeRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.home', {
        url: '/',
        template: homeTemplate,
        controller: 'homeController',
        controllerAs: 'home',
      });
  });
