import angular from 'angular';
import _ from 'lodash';

import loginBoxTemplate from './login-box.template.html';

export class LoginBoxDirective {
  constructor() {
    _.extend(this, {
      // this direcitve will apply to tag's name only,
      // i.e. <login-box>, note that loginBox will be
      // transformed to login-box
      restrict: 'E',
      // create its isolate scope that will not interfere with
      // the outside world
      // scope is equivalent to `this` in the class above
      scope: {},
      // always use bindToController
      // so that the code will work as expected
      bindToController: true,
      // this is var's name to be used in template
      // to use controller's `this`
      controllerAs: 'loginBox',
      template: loginBoxTemplate,
    });
  }

  controller() {
    console.log('controller executed!');
  }

  link(scope, element, attr) {
    console.log('scope:', scope);
    console.log('element:', element);
    console.log('attr:', attr);

    element.children('.modal').openModal();
  }
}

export let loginBoxDirectiveModule =
  angular.module('loginBoxDirectiveModule', []);

loginBoxDirectiveModule.directive('loginBox',
  () => {
    return new LoginBoxDirective();
  });
