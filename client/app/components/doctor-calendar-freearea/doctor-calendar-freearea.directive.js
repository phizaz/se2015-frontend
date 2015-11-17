import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive';

// locals
import template from './doctor-calendar-freearea.template.html';
import './doctor-calendar-freearea.sass';

export let doctorCalendarFreeareaDirectiveModule =
  angular
    .module('doctorCalendarFreeareaDirectiveModule', [])
    .directive('doctorCalendarFreearea', doctorCalendarFreeareaDirective);

export function doctorCalendarFreeareaDirective() {

  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    _.extend(my, {

      // this is intentionally put here
      public: my,
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
    scope: {

    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: template,
  };

}
