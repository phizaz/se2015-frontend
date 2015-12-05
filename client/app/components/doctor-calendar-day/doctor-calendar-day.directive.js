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

const partial =
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

partial.directive('doctorCalendarDay', (DOCTOR_CALENDAR, DoctorTimeEditing) => {

  return Directive.new({
    controllerAs: 'my',
    template: template,

    interfaces: {
      public: '=name',
      date: '=',
      appointmentList: '=',
      doctorTimeList: '=',
      first: '=',
    },

    props: {
      DOCTOR_CALENDAR: DOCTOR_CALENDAR,
      appointmentModals: [],
      editing: false,
      editingGrid: [],
    },

    methods: {
      blockToTime(block) {
        return TimeBlockConverter.blockToTime(
          DOCTOR_CALENDAR.beginHours, block);
      },

      startEditing(grid) {
        // console.log('day: ', my.date, 'grid:', grid);
        this.editing = true;
        this.editingGrid = grid || [];
        // start gridster
      },

      askDamage() {
        let damages =
          DoctorTimeEditing.calculateDamage(this.appointmentList, this.editingGrid);
        return damages;
      },

      /**
       * gather changes done in this day
       * return the change list
       */
      askChanges() {
        let [deletions, creations] =
          DoctorTimeEditing.calculateChange(this.doctorTimeList, this.editingGrid, moment(this.date));

        return {
          delete: deletions,
          create: creations,
        };
      },

      finishEditing() {
        this.editing = false;
      },


      cancelEditing() {
        this.editing = false;
      },

      editDeleteDoctorTime(item) {
        // console.log('this:', this);
        let idx = _.findIndex(this.editingGrid, item);
        // remove from array
        this.editingGrid.splice(idx, 1);
      },

      editCreateDoctorTime(row) {
        console.log('creating a new doctor time:', row, this.editingGrid);

        if (!this.editingGrid) {
          this.editingGrid = [];
        }

        this.editingGrid.push({
          sizeX: 1,
          sizeY: 1,
          row: row,
          col: 0,
        });
      },
    }

  });

});
