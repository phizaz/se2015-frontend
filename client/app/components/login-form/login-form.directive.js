/**
 * login-form
 * <login-form></login-form>
 */

import angular from 'angular';
import _ from 'lodash';

import loginFormTemplate from './login-form.template.html';
import './login-form.sass';

export let loginFormDirectiveModule =
  angular.module('loginFormDirectiveModule', []);

export function loginFormDirective() {
  let shared = {};

  function controller () {
    _.extend(this, {
      form: {
        username: '',
        password: '',
      }
    });
  }

  function link($scope, element, attrs) {
    shared.element = element;
    shared.attrs = attrs;
  }

  return {
    // this direcitve will apply to tag's name only,
    // i.e. <login-form>, note that loginForm will be
    // transformed to login-form
    restrict: 'E',
    // create its isolate scope that will not interfere with
    // the outside world
    // scope is equivalent to `this` in the class
    scope: {
      form: '=name'
    },
    // always use bindToController
    // so that the code will work as expected
    bindToController: true,
    controller: controller,
    // this is var's name to be used in template
    // to use controller's `this`
    controllerAs: 'loginForm',
    link: link,
    template: loginFormTemplate,
  };
}

loginFormDirectiveModule.directive('loginForm', loginFormDirective);
