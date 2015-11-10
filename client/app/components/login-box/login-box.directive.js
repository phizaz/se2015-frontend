import angular from 'angular';

import loginBoxTemplate from './login-box.template.html';

export class LoginBoxController {
  constructor() {
    this.test = 'yo! this is the login-box';
  }
}

export let loginBoxDirectiveModule =
  angular.module('loginBoxDirectiveModule', []);

loginBoxDirectiveModule.directive('loginBox',
  () => {
    return {
      // this direcitve will apply to tag's name only,
      // i.e. <login-box>, note that loginBox will be
      // transformed to login-box
      restrict: 'E',
      // create its isolate scope that will not interfere with
      // the outside world
      scope: {},
      // always use bindToController
      // so that the code will work as expected
      bindToController: true,
      controller: LoginBoxController,
      // this is var's name to be used in template
      // to use controller's `this`
      controllerAs: 'loginBox',
      template: loginBoxTemplate,
    };

  });
