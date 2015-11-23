import angular from 'angular';
import 'angular-ui-router';
import 'angular-messages';
import "./register.sass";
import registerTemplate from './register.template.html';
import {RegisterController} from './register.controller';
import {registerServiceModule} from '../../services/register.service.js';

export let registerRouteModule =
  angular.module('registerRouteModule', [
    'ui.router',
    'ngMessages',
    registerServiceModule.name
  ]);

registerRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.register', {
        url: '/register',
        template: registerTemplate,
        controller: RegisterController,
        controllerAs: 'register',
        resolve: {
          redirectToHisOwnPage: (Login) => {
            return Login.toHisOwnPage();
          }
        }
      })
      // alias
      .state('register', {
        controller: ($state) => $state.go('navigator.register')
      });
  });
