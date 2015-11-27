import angular from 'angular';
import _ from 'lodash';
import moment from 'moment';
import Directive from '../directive';
import TimeBlockConverter from '../../helpers/timeBlockCoverter';

// angular gridster
import 'javascript-detect-element-resize/jquery.resize.js';
import 'angular-gridster/dist/angular-gridster.min.js';
import 'angular-gridster/dist/angular-gridster.min.css';

import template from './doctor-calendar-day.template.html';
import './doctor-calendar-day.sass';

let partial =
  angular
    .module('doctorCalendarDayDirectiveModule', [
      'gridster',
      // constant
      require('../../constants/doctorCalendar.constant'),

      // services
      require('../../services/doctorTimeEditing.service'),

      // directives
      require('../doctor-calendar-appointment/doctor-calendar-appointment.directive'),
      require('../doctor-calendar-freearea/doctor-calendar-freearea.directive'),
      require('../doctor-calendar-appointment-modal/doctor-calendar-appointment-modal.directive')
      ]);

export default partial.name;

partial.directive('doctorCalendarDay', doctorCalendarDayDirective);

partial.run(
  (gridsterConfig, DOCTOR_CALENDAR) => {
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

function doctorCalendarDayDirective(DOCTOR_CALENDAR, DoctorTimeEditing) {

  let shared = {};

  function controller($scope) {
    let my = Directive.constructor($scope, this);

    _.extend(my, {
      DOCTOR_CALENDAR: DOCTOR_CALENDAR,
      appointmentModals: [],
      editing: false,
      editingGrid: [],
      blockToTime: blockToTime,

      // functions
      startEditing: startEditing,
      askChanges: askChanges,
      finishEditing: finishEditing,
      cancelEditing: cancelEditing,
      askDamage: askDamage,

      editDeleteDoctorTime: editDeleteDoctorTime,
      editCreateDoctorTime: editCreateDoctorTime,
      // this is intentionally put here
      public: my,
    });

    console.log('calendar-day my:', my);

    function blockToTime(block) {
      return TimeBlockConverter.blockToTime(
        DOCTOR_CALENDAR.beginHours, block);
    }

    function startEditing(grid) {
      // console.log('day: ', my.date, 'grid:', grid);
      my.editing = true;
      my.editingGrid = grid || [];
      // start gridster
    }

    function askDamage() {
      let damages =
        DoctorTimeEditing.calculateDamage(my.appointmentList, my.editingGrid);
      return damages;
    }

    /**
     * gather changes done in this day
     * return the change list
     */
    function askChanges() {
      let [deletions, creations] =
        DoctorTimeEditing.calculateChange(my.doctorTimeList, my.editingGrid, moment(my.date));

      return {
        delete: deletions,
        create: creations,
      };
    }

    function finishEditing() {
      my.editing = false;
    }


    function cancelEditing() {
      my.editing = false;
    }

    function editDeleteDoctorTime(item) {
      // console.log('my:', my);
      let idx = _.findIndex(my.editingGrid, item);
      // remove from array
      my.editingGrid.splice(idx, 1);
    }

    function editCreateDoctorTime(row) {
      console.log('creating a new doctor time:', row, my.editingGrid);

      if (!my.editingGrid) {
        my.editingGrid = [];
      }

      my.editingGrid.push({
        sizeX: 1,
        sizeY: 1,
        row: row,
        col: 0,
      });
    }
  }

  function link($scope, element, attrs) {
    let my = Directive.getPrivate($scope);

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
