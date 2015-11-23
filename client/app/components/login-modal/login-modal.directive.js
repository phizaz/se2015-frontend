/**
 * login-modal
 * <login-modal name="..."></login-modal>
 * ex.
 * <login-modal name="home.loginModal"></login-modal>
 * now, you can call home.loginModal.show()
 */

import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

import loginModalTemplate from './login-modal.template.html';
import './login-modal.sass';
import {loginServiceModule} from '../../services/login.service.js';
import {DirectiveBlueprint} from '../directive.js';

export let loginModalDirectiveModule =
  angular.module('loginModalDirectiveModule', [
    'ui.router',
    loginServiceModule.name
  ]);

export function loginModalDirective(Login, $state) {
  console.log('login modal is loaded');
  let shared = {};


  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;

    // my.showModal();
  }

  function controller ($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);
    console.log('login modal controller is loaded');

    _.extend(my, {
      form: {},
      error: {},
      loading: false,
      $scope: $scope,

      login: login,
      showModal: showModal,
      closeModal: closeModal,

      public: my,
    });

    function showModal() {
      console.log('show');
      my.element.children('.modal').openModal();

      // redirect to hisowpnage if needed
      my.loading = true;
      Login
        .toHisOwnPage()
        .then(
          (res) => {
            my.loading = false;
          })
        .catch(
          (res) => {
            my.loading = false;
            my.closeModal();
            $state.go(res.redirect);
          });
    }

    function closeModal() {
      my.element.children('.modal').closeModal();
    }

    function login(form) {
      my.loading = true;
      delete my.error.wrong;

      Login
        .takeLogin(form.username, form.password)
        .then(
          (res) => {
            my.loading = false;
            console.log('login res:', res);

            Login
              .toHisOwnPage()
              .then(
                (res) => {
                  // unexpected
                  // เพราะว่ามันจะไม่เรียกตรงนี้ถ้า login แล้ว
                  throw new Error(res);
                })
              .catch(
                (res) => {
                  // redirect ไปยังหน้าของตัวเอง
                  my.closeModal();
                  $state.go(res.redirect);
                });

          })
        .catch(
          (res) => {
            my.loading = false;
            my.error.wrong = true;

            console.log(res);
            throw new Error('login');
          });
    }



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
      public: '=name'
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
