import angular from 'angular';
import _ from 'lodash';
import moment from 'moment';
import {DirectiveBlueprint} from '../directive.js';

import showAppointmentTemplate from './show-appointment.template.html';
import './show-appointment.sass';

export let showAppointmentDirectiveModule =
  angular
    .module('showAppointmentDirectiveModule', [
      ])
    .directive('showAppointment', showAppointment);

function showAppointment() {
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
      timetime: moment(my.appointment.time),
      name: my.appointment.doctor_name,
      public: my,
    });
  }

  return {
    restrict: 'E',
    scope: {
      appointment: '=',
      public: '=name'
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: showAppointmentTemplate,
  };
}
