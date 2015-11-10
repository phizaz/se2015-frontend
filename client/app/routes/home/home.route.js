import angular from 'angular';
import 'angular-ui-router';

import {navigatorServiceModule} from '../../services/navigator.service.js';
import {loginModalDirectiveModule} from '../../components/login-modal/login-modal.directive.js';

import homeTemplate from './home.template.html';
import {HomeController} from './home.controller.js';


export let homeRouteModule =
  angular.module('homeRouteModule', [
    'ui.router',
    navigatorServiceModule.name,
    loginModalDirectiveModule.name,
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
