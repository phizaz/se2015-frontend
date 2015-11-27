import angular from 'angular';
import 'angular-ui-router';

import {NavigatorController} from './navigator.controller.js';
import navigatorTemplate from './navigator.template.html';
import './navigator.sass';

let partial =
  angular.module('navigatorRouteModule', [
    'ui.router',

    // routes
    require('../home/home.route'),
    require('../register/register.route'),
    require('../staff-register/staff-register.route'),
  ]);

export default partial.name;

partial.config(
  ($stateProvider) => {
    $stateProvider

      .state('navigator', {
        abstract: true,
        template: navigatorTemplate,
        controller: NavigatorController,
        controllerAs: 'navigator',
      });
  });
