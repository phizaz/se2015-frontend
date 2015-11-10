import angular from 'angular';
import 'angular-ui-router';

import {loginFormDirectiveModule} from '../../components/login-form/login-form.directive.js';
import loginTemplate from './login.template.html';
import {LoginController} from './login.controller';

export let loginRouteModule =
  angular.module('loginRouteModule', [
    'ui.router',
    loginFormDirectiveModule.name,
  ]);

loginRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.login', {
        url: '/login',
        template: loginTemplate,
        controller: LoginController,
      });
  });
