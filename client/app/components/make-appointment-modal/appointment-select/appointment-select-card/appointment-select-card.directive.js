import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../../../directive.js';

import appointmentSelectCardTemplate from './appointment-select-card.template.html';
import './appointment-select-card.sass';

export let appointmentSelectCardDirectiveModule =
  angular
    .module('appointmentSelectCardDirectiveModule', [])
    .directive('appointmentSelectCard', appointmentSelectCardDirective);

export function appointmentSelectCardDirective() {
  // shared across every instance of the directive
  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    _.extend(my, {

    });
  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);

    _.extend(my, {
      element: element,
      attrs: attrs,
    });
  }

  return {
    restrict: 'E',
    template: appointmentSelectCardTemplate,
    link: link,
    controller: controller,
    controllerAs: 'card',
    bindToController: true,
    scope: {},
  };
}
