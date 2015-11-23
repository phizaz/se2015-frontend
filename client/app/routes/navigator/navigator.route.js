import angular from 'angular';
import 'angular-ui-router';

// routes
import {homeRouteModule} from '../home/home.route.js';
import {loginRouteModule} from '../login/login.route.js';
import {registerRouteModule} from '../register/register.route.js';
import {staffRegisterRouteModule} from '../staff-register/staff-register.route.js';
// services

// local use
import {NavigatorController} from './navigator.controller.js';
import navigatorTemplate from './navigator.template.html';
import './navigator.sass';

export let navigatorRouteModule =
  angular.module('navigatorRouteModule', [
    'ui.router',

    // routes
    homeRouteModule.name,
    loginRouteModule.name,
    registerRouteModule.name,
    staffRegisterRouteModule.name,
    // services
  ]);

navigatorRouteModule.config(
  ($stateProvider) => {
    $stateProvider

      .state('navigator', {
        abstract: true,
        template: navigatorTemplate,
        controller: NavigatorController,
        controllerAs: 'navigator',
      });
  });
