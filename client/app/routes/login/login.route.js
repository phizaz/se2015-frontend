import angular from 'angular';
import 'angular-ui-router';

import {loginBoxDirectiveModule} from '../../components/login-box/login-box.directive.js';
import loginTemplate from './login.template.html';
import {LoginController} from './login.controller';

export let loginRouteModule =
  angular.module('loginRouteModule', [
    'ui.router',
    loginBoxDirectiveModule.name,
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
