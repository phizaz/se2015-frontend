import angular from 'angular';
import 'angular-ui-router';

import {loginServiceModule} from '../../services/login.service';
import {loginFormDirectiveModule} from '../../components/login-form/login-form.directive.js';

import './login.sass';
import loginTemplate from './login.template.html';
import {LoginController} from './login.controller';

export let loginRouteModule =
  angular.module('loginRouteModule', [
    'ui.router',
    loginServiceModule.name,
    loginFormDirectiveModule.name,
  ]);

loginRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.login', {
        url: '/login',
        template: loginTemplate,
        controller: LoginController,
        resolve: {
          redirectToHisOwnPage: (Login) => {
            return Login.toHisOwnPage();
          }
        }
      })
      .state('login', {
        controller: ($state) => $state.go('navigator.login')
      });
  });
