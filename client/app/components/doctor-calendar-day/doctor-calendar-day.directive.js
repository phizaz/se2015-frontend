import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive';

// angular gridster
import 'javascript-detect-element-resize/jquery.resize.js';
import 'angular-gridster/dist/angular-gridster.min.js';
import 'angular-gridster/dist/angular-gridster.min.css';

// constants
import {doctorCalendarConstantModule} from '../../constants/doctorCalendar.constant';

// directives
import {doctorCalendarAppointmentDirectiveModule} from '../doctor-calendar-appointment/doctor-calendar-appointment.directive';
import {doctorCalendarFreeareaDirectiveModule} from '../doctor-calendar-freearea/doctor-calendar-freearea.directive';
import {doctorCalendarAppointmentModalDirectiveModule} from '../doctor-calendar-appointment-modal/doctor-calendar-appointment-modal.directive';

// locals
import template from './doctor-calendar-day.template.html';
import './doctor-calendar-day.sass';

export let doctorCalendarDayDirectiveModule =
  angular
    .module('doctorCalendarDayDirectiveModule', [
      'gridster',
      doctorCalendarConstantModule.name,
      doctorCalendarAppointmentDirectiveModule.name,
      doctorCalendarFreeareaDirectiveModule.name,
      doctorCalendarAppointmentModalDirectiveModule.name,
      ])
    .directive('doctorCalendarDay', doctorCalendarDayDirective);

export function doctorCalendarDayDirective(DOCTOR_CALENDAR) {

  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    let appointmentModals = [];

    _.extend(my, {
      DOCTOR_CALENDAR: DOCTOR_CALENDAR,
      appointmentModals: appointmentModals,
      // this is intentionally put here
      public: my,
    });

    console.log('calendar-day my:', my);
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
      appointmentList: '=',
      doctorTimeList: '=',
      first: '=',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: template,
  };

}
