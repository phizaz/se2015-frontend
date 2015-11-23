import angular from 'angular';
import 'angular-ui-router';
import 'angular-messages';

import {staffRegisterServiceModule} from '../../services/staff-register.service.js';

import {loginModalDirectiveModule} from '../../components/login-modal/login-modal.directive';

import {StaffRegisterController} from './staff-register.controller';
import template from './staff-register.template.html';
import "./staff-register.sass";

export let staffRegisterRouteModule =
  angular.module('staffRegisterRouteModule', [
    'ui.router',
    'ngMessages',
    staffRegisterServiceModule.name,
    loginModalDirectiveModule.name,
  ]);

staffRegisterRouteModule.config(
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
