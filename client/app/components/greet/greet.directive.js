import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive.js';

import greetTemplate from './greet.template.html';
import './greet.sass';

export let greetDirectiveModule =
  angular
    .module('greetDirectiveModule', [
      ])
    .directive('greet', greet);

export function greet() {
  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);
    _.extend(my, {
      public: {
      }
    });
  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;

    // my.public.show();
  }

  return {
    restrict: 'E',
    scope: {
      public: '=name'
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'greet',
    link: link,
    template: greetTemplate,
  };
}
