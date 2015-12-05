import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';
import Directive from '../directive.js';

import greetTemplate from './greet.template.html';
import './greet.sass';

const partial =
  angular
    .module('greetDirectiveModule', [
      'ui.router',

      // services
      require('../../services/login.service')
    ]);

export default partial.name;

partial.directive('greet', greet);

function greet(Login, $state) {
  let shared = {};

  function controller($scope) {
    let my = Directive.constructor($scope, this);

    _.extend(my, {
      loggingOut: false,

      logout: logout,

      public: my
    });

    console.log('greet my:', my);

    function logout() {
      my.loggingOut = true;

      Login
        .takeLogout()
        .then(
          (res) => {
            my.loggingOut = false;
            $state.go('home');
          })
        .catch(
          (res) => {
            console.log(res);
            throw new Error('greet logout');
          });
    }
  }

  function link($scope, element, attrs) {
    let my = Directive.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;
  }

  return {
    restrict: 'E',
    scope: {
      public: '=name',
      userInfo: '=',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'greet',
    link: link,
    template: greetTemplate,
  };
}
