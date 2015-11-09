import angular from 'angular';
import 'angular-ui-router';

import {homeRouteModule} from '../home/home.route.js';

import {navigatorServiceModule} from '../../services/navigator.service.js';
import {messagerServiceModule} from '../../services/messager.service.js';
import {NavigatorController} from './navigator.controller.js';
import navigatorTemplate from './navigator.template.html';
import './navigator.sass';

export let navigatorRouteModule =
  angular.module('navigatorRouteModule', [
    'ui.router',
    homeRouteModule.name,
    navigatorServiceModule.name,
    messagerServiceModule.name,
  ]);

navigatorRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      // login with facebook page
      .state('navigator', {
        abstract: true,
        template: navigatorTemplate,
        controller: NavigatorController,
        controllerAs: 'navigator',
      });
  });
