/**
 * login-modal
 * <login-modal name="..."></login-modal>
 * ex.
 * <login-modal name="home.loginModal"></login-modal>
 * now, you can call home.loginModal.setActive()
 */

import angular from 'angular';
import _ from 'lodash';

import loginModalTemplate from './login-modal.template.html';
import './login-modal.sass';

export function loginModalDirective() {
  let shared = {};

  let api = {
    setActive: setActive
  };

  function controller () {
    // expose 'api' to the outside (=name)
    _.extend(this, { api: api });
  }

  function link($scope, element, attrs) {
    shared.element = element;
    shared.attrs = attrs;
  }

  function setActive() {
    shared.element.children('.modal').openModal();
  }

  return {
    // this direcitve will apply to tag's name only,
    // i.e. <login-modal>, note that loginModal will be
    // transformed to login-modal
    restrict: 'E',
    // create its isolate scope that will not interfere with
    // the outside world
    // scope is equivalent to `this` in the class
    scope: {
      api: '=name'
    },
    // always use bindToController
    // so that the code will work as expected
    bindToController: true,
    controller: controller,
    // this is var's name to be used in template
    // to use controller's `this`
    controllerAs: 'loginModal',
    link: link,
    template: loginModalTemplate,
  };
}

export let loginModalDirectiveModule =
  angular.module('loginModalDirectiveModule', []);

loginModalDirectiveModule.directive('loginModal', loginModalDirective);
