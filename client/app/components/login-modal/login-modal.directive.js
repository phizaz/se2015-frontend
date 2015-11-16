/**
 * login-modal
 * <login-modal name="..."></login-modal>
 * ex.
 * <login-modal name="home.loginModal"></login-modal>
 * now, you can call home.loginModal.show()
 */

import angular from 'angular';
import _ from 'lodash';

import loginModalTemplate from './login-modal.template.html';
import './login-modal.sass';
import {loginServiceModule} from '../../services/login.service.js';

export let loginModalDirectiveModule =
  angular.module('loginModalDirectiveModule', [
    loginServiceModule.name
  ]);

export function loginModalDirective(Login) {
  console.log('login modal is loaded');
  let shared = {};

  let api = {
    show: show
  };

  function controller () {
    console.log('login modal controller is loaded');
    // expose 'api' to the outside (=name)
    _.extend(this, {
      api: api,
      reg: reg,
      login: () => {
        Login.takeLogin(this.loginForm.username,this.loginForm.password);
      }
    });
  }
  function reg(){
    console.log("reg already");
  }
  function link($scope, element, attrs) {
    shared.element = element;
    shared.attrs = attrs;
  }

  function show() {
    console.log('show');
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

loginModalDirectiveModule.directive('loginModal', loginModalDirective);
