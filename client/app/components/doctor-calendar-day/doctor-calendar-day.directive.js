import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive';

// angular gridster
import 'javascript-detect-element-resize/jquery.resize.js';
import 'angular-gridster/dist/angular-gridster.min.js';
import 'angular-gridster/dist/angular-gridster.min.css';

// locals
import template from './doctor-calendar-day.template.html';
import './doctor-calendar-day.sass';

export let doctorCalendarDayDirectiveModule =
  angular
    .module('doctorCalendarDayDirectiveModule', [
      'gridster',
      ])
    .directive('doctorCalendarDay', doctorCalendarDayDirective);

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
      date: '=',
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
