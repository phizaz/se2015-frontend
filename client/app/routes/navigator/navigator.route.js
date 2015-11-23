import angular from 'angular';
import 'angular-ui-router';

// routes
import {homeRouteModule} from '../home/home.route.js';
import {loginRouteModule} from '../login/login.route.js';
import {registerRouteModule} from '../register/register.route.js';
import {staffRegisterRouteModule} from '../staff-register/staff-register.route.js';
import {staffRouteModule} from '../staff/staff.route.js';
import {doctorRouteModule} from '../doctor/doctor.route';
import {nurseRouteModule} from '../nurse/nurse.route';
import {pharmacistRouteModule} from '../pharmacist/pharmacist.route.js';
// services
import {navigatorServiceModule} from '../../services/navigator.service.js';
import {messagerServiceModule} from '../../services/messager.service.js';

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
    staffRouteModule.name,
    doctorRouteModule.name,
    nurseRouteModule.name,
    pharmacistRouteModule.name,
    // services
    navigatorServiceModule.name,
    messagerServiceModule.name,
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
