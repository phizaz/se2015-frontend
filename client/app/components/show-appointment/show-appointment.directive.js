import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive.js';

import showAppointmentTemplate from './show-appointment.template.html';
import './show-appointment.sass';

export let showAppointmentDirectiveModule =
  angular
    .module('showAppointmentDirectiveModule', [
      ])
    .directive('showAppointment', showAppointment);

export function showAppointment() {
  let shared = {};

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;
    my.element.find('.card3').hide();

    // my.public.show();
  }

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);
    _.extend(my, {
      public: my,
    });
  }

  return {
    restrict: 'E',
    scope: {
      public: '=name'
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'showAppointment',
    link: link,
    template: showAppointmentTemplate,
  };
}
