import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive';
import {TimeBlockConverter} from '../../helpers/timeBlockCoverter';

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
    .directive('doctorCalendarDay', doctorCalendarDayDirective)
    .run((gridsterConfig, DOCTOR_CALENDAR) => {
        _.extend(gridsterConfig, {
          mobileBreakPoint: 0,
          columns: 1,
          floating: false,
          swapping: false,
          pushing: false,
          rowHeight: DOCTOR_CALENDAR.blockHeight,
          minColumns: 1,
          minRows: 1,
          defaultSizeX: 1,
          defaultSizeY: 1,
          minSizeX: 1,
          maxSizeX: 1,
          minSizeY: 1,
          maxSizeY: null,
          outerMargin: true,
          margins: [ 2 * DOCTOR_CALENDAR.blockPadding, DOCTOR_CALENDAR.blockPadding],
        });

        console.log('gridsterConfig:', gridsterConfig);
      });

export function doctorCalendarDayDirective(DOCTOR_CALENDAR) {

  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    _.extend(my, {
      DOCTOR_CALENDAR: DOCTOR_CALENDAR,
      appointmentModals: [],
      editing: false,
      editingGrid: [],
      grid: [
        { size: { x: 2, y: 1 }, position: [0, 0] },
        { size: { x: 2, y: 2 }, position: [0, 2] },
        { size: { x: 1, y: 1 }, position: [0, 4] },
        { size: { x: 1, y: 1 }, position: [0, 5] },
        { size: { x: 2, y: 1 }, position: [1, 0] },
        { size: { x: 1, y: 1 }, position: [1, 4] },
        { size: { x: 1, y: 2 }, position: [1, 5] },
        { size: { x: 1, y: 1 }, position: [2, 0] },
        { size: { x: 2, y: 1 }, position: [2, 1] },
        { size: { x: 1, y: 1 }, position: [2, 3] },
        { size: { x: 1, y: 1 }, position: [2, 4] }
      ],
      blockToTime: blockToTime,

      // functions
      startEditing: startEditing,
      finishEditing: finishEditing,
      cancelEditing: cancelEditing,
      // this is intentionally put here
      public: my,
    });

    console.log('calendar-day my:', my);

    function blockToTime(block) {
      return TimeBlockConverter.blockToTime(
        DOCTOR_CALENDAR.beginHours, block);
    }

    function startEditing(grid) {
      console.log('day: ', my.date, 'grid:', grid);
      my.editing = true;
      my.editingGrid = grid;
      // start gridster
    }

    /**
     * gather changes done in this day
     * return the change list
     */
    function finishEditing() {
      let chanegs = [];

      // todo

      my.editing = false;
      return changes;
    }

    function cancelEditing() {
      my.editing = false;
    }
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
      public: '=name',
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
