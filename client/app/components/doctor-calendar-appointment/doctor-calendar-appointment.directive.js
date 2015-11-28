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

partial.directive('doctorCalendarAppointment', (DOCTOR_CALENDAR) => {
  return Directive.new({
    controllerAs: 'my',
    template: template,

    interfaces: {
      modal: '=targetModal',
      appointment: '=',
    },

    props: {

    },

    link() {
      this.setPos();
    },

    methods: {
      setPos() {
        let blockHeight = DOCTOR_CALENDAR.blockHeight;
        let startBlock =
          TimeBlockConverter.timeToBlock(DOCTOR_CALENDAR.beginHours, this.appointment.time);
        let top = blockHeight * startBlock - 1.5 * DOCTOR_CALENDAR.blockPadding;

        this.element.css('top', top);
      }
    },


  });
});
