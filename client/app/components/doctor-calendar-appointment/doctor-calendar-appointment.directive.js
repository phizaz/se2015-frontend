import angular from 'angular';
import _ from 'lodash';
import Directive from '../directive';
import TimeBlockConverter from '../../helpers/timeBlockCoverter';

import template from './doctor-calendar-appointment.template.html';
import './doctor-calendar-appointment.sass';

let partial =
  angular
    .module('doctorCalendarAppointmentDirectiveModule', [
      // constant
      require('../../constants/doctorCalendar.constant'),
    ]);

export default partial.name;

partial.directive('doctorCalendarAppointment', doctorCalendarAppointmentDirective);

function doctorCalendarAppointmentDirective(DOCTOR_CALENDAR) {
  let shared = {};

  function controller($scope) {
    let my = Directive.constructor($scope, this);

    _.extend(my, {

      // this is intentionally put here
      public: my,
    });
  }

  function link($scope, element, attrs) {
    let my = Directive.getPrivate($scope);


    function setPos() {
      let blockHeight = DOCTOR_CALENDAR.blockHeight;
      let startBlock =
        TimeBlockConverter.timeToBlock(DOCTOR_CALENDAR.beginHours, my.appointment.time);
      let top = blockHeight * startBlock - 1.5 * DOCTOR_CALENDAR.blockPadding;

      // console.log('top:', top);

      element.css('top', top);
    }

    setPos();

    _.extend(my, {
      element: element,
      attrs: attrs,

      setPos: setPos,
    });
  }

  return {
    restrict: 'E',
    scope: {
      modal: '=targetModal',
      appointment: '=',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: template,
  };

}
