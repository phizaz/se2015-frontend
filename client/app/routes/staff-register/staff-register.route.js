import angular from 'angular';
import 'angular-ui-router';
import 'angular-messages';

import {StaffRegisterController} from './staff-register.controller';
import template from './staff-register.template.html';
import "./staff-register.sass";

let partial =
  angular.module('staffRegisterRouteModule', [
    'ui.router',
    'ngMessages',

    // services
    require('../../services/staff-register.service'),

    // directives
    require('../../components/login-modal/login-modal.directive'),
  ]);

export default partial.name;

partial.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.staff-register', {
        url: '/staff-register',
        template: template,
        controller: StaffRegisterController,
        controllerAs: 'register',
        resolve: {
          redirectToHisOwnPage: (Login) => {
            return Login.toHisOwnPage();
          },
        }
      })
      .state('staff-register', {
        controller: ($state) => $state.go('navigator.staff-register')
      });
  });
