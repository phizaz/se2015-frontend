import angular from 'angular';
import 'angular-ui-router';

// services
import {navigatorServiceModule} from '../../services/navigator.service.js';

// directives
import {loginModalDirectiveModule} from '../../components/login-modal/login-modal.directive.js';
import {makeAppointmentModalDirectiveModule} from '../../components/make-appointment-modal/make-appointment-modal.directive.js';

// locals
import homeTemplate from './home.template.html';
import {HomeController} from './home.controller.js';

export let homeRouteModule =
  angular.module('homeRouteModule', [
    'ui.router',
    navigatorServiceModule.name,

    loginModalDirectiveModule.name,
    makeAppointmentModalDirectiveModule.name,
  ]);

homeRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.home', {
        url: '/',
        template: homeTemplate,
        controller: HomeController,
        controllerAs: 'home',
        resolve: {

        }
      });
  });
