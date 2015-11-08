import angular from 'angular';
import 'angular-ui-router';

import navigatorTemplate from './navigator.template.html';
import './navigator.sass';

import {homeRouteModule} from '../home/home.route.js';

export let navigatorRouteModule = angular.module('navigatorRouteModule', [
  'ui.router',
  homeRouteModule.name,
  ]);

navigatorRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      // login with facebook page
      .state('navigator', {
        abstract: true,
        template: navigatorTemplate,
      });
  });
