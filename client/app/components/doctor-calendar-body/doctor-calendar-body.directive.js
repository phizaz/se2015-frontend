import angular from 'angular';
import _ from 'lodash';
import moment from 'moment';
import Directive from '../directive';
import TimeBlockConverter from '../../helpers/timeBlockCoverter';

import template from './doctor-calendar-body.template.html';
import './doctor-calendar-body.sass';

const partial =
  angular
    .module('doctorCalendarBodyDirectiveModule', [
      // constant
      require('../../constants/doctorCalendar.constant'),

      // services
      require('../../services/doctorTimeEditing.service'),

      // directives
      require('../doctor-calendar-day/doctor-calendar-day.directive'),
    ]);

export default partial.name;

partial.directive('doctorCalendarBody', (DOCTOR_CALENDAR, DoctorTimeEditing) => {

  return Directive.new({
    controllerAs: 'my',
    template: template,

    interfaces: {
      public: '=name',
      currentWeek: '=',
      pureAppointmentList: '=doctorAppointmentList',
      pureDoctorTimeList: '=doctorTimeList',
      marginTop: '=',
      timeWidth: '=',
    },

    props: {
      calendarTimesList: [],
      appointmentListByDate: {},
      doctorTimeListByDate: {},
      daysInWeek: [],
      editing: false,
      editingGridByDate: {},
      doctorCalendarDays: [],
    },

    link($scope, element, attrs) {
      console.log('$scope:', $scope);
      console.log('element:', element);
      console.log('attrs:', attrs);
      let $element = $(element);

      let $body = $element.find('.doctor-calendar-body');
      let $time = $element.find('.doctor-calendar-time');
      let $week = $element.find('.doctor-calendar-week');

      $body.css({
        'padding-top': this.marginTop
      });
      $time.width(this.timeWidth);


      let setWeekWidth = () => {
        let windowWidth = $(window).width();
        $week.width(windowWidth - this.timeWidth);
        console.log($week.width());
      };

      setWeekWidth();

      $(window).resize(() => setWeekWidth());
    },

    watcher($scope) {
      console.log('watcher works!');

      $scope.$watch('my.currentWeek',
        (currentWeek) => {
          console.log('currentWeek has changed to:', currentWeek);
          this.createDaysInWeek();
        }, true);
    },

    starter() {
      console.log('calendar-body my:', this);

      this.init(this.pureAppointmentList, this.pureDoctorTimeList);
    },

    methods: {

      dateFormat: dateFormat,

      init(appointmentList, doctorTimeList) {

        _.extend(this, {
          calendarTimesList: [],
          appointmentListByDate: sortAppointmentByDate(appointmentList),
          doctorTimeListByDate: sortDoctorTimeByDate(doctorTimeList),
        });

        for (let i = 0; i < DOCTOR_CALENDAR.blockCounts; ++i) {
          this.calendarTimesList.push({
            blockNumber: i,
            time: TimeBlockConverter.blockToTime(DOCTOR_CALENDAR.beginHours, i)
          });
        }
      },

      createDaysInWeek() {
        for (let i = 0; i < 7; ++i) {
          this.daysInWeek[i] = moment(this.currentWeek).day(i).startOf('day');
        }
      },

      makeEditingGrid() {
        let theGrid =
          DoctorTimeEditing.makeEditingGrid(this.doctorTimeListByDate);

        angular.copy(theGrid, this.editingGridByDate);
      },

      startEditing() {
        console.log('start editing doctortime');
        console.log('doctorCalendarDay:', this.doctorCalendarDays);
        this.makeEditingGrid();
        this.editing = true;
        for (let each of this.doctorCalendarDays) {
          let dateString = this.dateFormat(each.date);
          each.startEditing(this.editingGridByDate[dateString]);
        }
      },

      askDamage() {
        let damages = {};
        for (let each of this.doctorCalendarDays) {
          let eachDamages = each.askDamage();
          if (eachDamages.length > 0) {
            damages[this.dateFormat(each.date)] = eachDamages;
          }
        }
        return damages;
      },

      askChanges() {
        console.log('stop editing doctortime');
        let changes = [];
        for (let each of this.doctorCalendarDays) {
          changes.push(each.askChanges());
        }

        return changes;
      },

      finishEditing() {
        for (let each of this.doctorCalendarDays) {
          each.finishEditing();
        }
        this.editing = false;
      },

      cancelEditing() {
        console.log('cancel editing doctortime');
        for (let each of this.doctorCalendarDays) {
          each.cancelEditing();
        }
        this.editing = false;
      },

    },

  });

});

// helpers

function dateFormat(datetime) {
  return datetime.format('YYYY-MM-DD');
}

function sortDoctorTimeByDate(doctorTimeList) {
  let result = {};

  for (let doctorTime of doctorTimeList) {
    let date = dateFormat(moment(doctorTime.doctorTime_begin));
    if (!result[date]) {
      result[date] = [];
    }

    result[date].push(doctorTime);
  }

  return result;
}

function sortAppointmentByDate(doctorAppointmentList) {
  console.log('doctorAppointmentList:', doctorAppointmentList);
  let result = {};

  for (let appointment of doctorAppointmentList) {
    let date = dateFormat(moment(appointment.time));
    if (!result[date]) {
      result[date] = [];
    }

    result[date].push(appointment);
  }

  return result;
}
