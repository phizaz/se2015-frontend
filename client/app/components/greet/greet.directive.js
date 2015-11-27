import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';
import {DirectiveBlueprint} from '../directive.js';

import {loginServiceModule} from '../../services/login.service';

import greetTemplate from './greet.template.html';
import './greet.sass';

let app =
  angular
    .module('greetDirectiveModule', [
      'ui.router',
      loginServiceModule.name,
    ]);

app.directive('greet', greet);

export let greetDirectiveModule = app;

function greet(Login, $state) {

  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

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
    let my = DirectiveBlueprint.getPrivate($scope);
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
