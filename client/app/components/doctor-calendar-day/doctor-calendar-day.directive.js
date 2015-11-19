import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive';

// locals
import template from './doctor-calendar-day.template.html';
import './doctor-calendar-day.sass';

export let doctorCalendarDayDirectiveModule =
  angular
    .module('doctorCalendarDayDirectiveModule', [])
    .directive('doctorCalendarDay', doctorCalendarDayDirective)
    .filter('range',
      () => {
        return (input, total) => {
          total = parseInt(total);

          for (var i=0; i<total; i++) {
            input.push(i);
          }

          return input;
        };
    });

export function doctorCalendarDayDirective() {

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
      blockCounts: '=',
      first: '=',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: template,
  };

}
