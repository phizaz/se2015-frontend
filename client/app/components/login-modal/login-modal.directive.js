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
import {DirectiveBlueprint} from '../directive.js';
export let loginModalDirectiveModule =
  angular.module('loginModalDirectiveModule', [
    loginServiceModule.name
  ]);

export function loginModalDirective(Login) {
  console.log('login modal is loaded');
  let shared = {};

  
  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;
  }
  function controller ($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);
    console.log('login modal controller is loaded');
    let api = {
        show: show
      };
    // expose 'api' to the outside (=name)
    function show() {
      console.log('show');
      my.element.children('.modal').openModal();
    }
    function close() {
      my.element.children.closeModal();
    }
    _.extend(this, {
      api: api,
      login: () => {
        Login
          .takeLogin(this.loginForm.username,this.loginForm.password)
          .then((res) => {
            close();
          });
      }

    });
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
