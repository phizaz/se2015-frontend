import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive.js';

import staffTransacTemplate from './staff-transac.template.html';
import './staff-transac.sass';

export let staffTransacDirectiveModule =
  angular
    .module('staffTransacDirectiveModule', [
      ])
    .directive('staffTransac', staffTransac);

export function staffTransac() {
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
    controllerAs: 'staffTransac',
    link: link,
    template: staffTransacTemplate,
  };
}
