import angular from 'angular';
import 'angular-ui-router';

import homeTemplate from './home.template.html';
import {navigatorServiceModule} from '../../services/navigator.service.js';
import {HomeController} from './home.controller.js';

export let homeRouteModule =
  angular.module('homeRouteModule', [
    'ui.router',
    navigatorServiceModule.name,
  ]);

homeRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.home', {
        url: '/',
        template: homeTemplate,
        controller: HomeController,
        controllerAs: 'home',
      });
  });
