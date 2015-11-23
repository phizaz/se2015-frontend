import angular from 'angular';
import _ from 'lodash';
import moment from 'moment';
import {DirectiveBlueprint} from '../directive';
import {TimeBlockConverter} from '../../helpers/timeBlockCoverter';

// constants
import {doctorCalendarConstantModule} from '../../constants/doctorCalendar.constant';

// service
import {doctorTimeEditingServiceModule} from '../../services/doctorTimeEditing.service';

// directives
import {doctorCalendarDayDirectiveModule} from '../doctor-calendar-day/doctor-calendar-day.directive';

// locals
import template from './doctor-calendar-body.template.html';
import './doctor-calendar-body.sass';

export let doctorCalendarBodyDirectiveModule =
  angular
    .module('doctorCalendarBodyDirectiveModule', [
      doctorCalendarConstantModule.name,
      doctorTimeEditingServiceModule.name,
      doctorCalendarDayDirectiveModule.name,
      ])
    .directive('doctorCalendarBody', doctorCalendarBodyDirective);

export function doctorCalendarBodyDirective(DOCTOR_CALENDAR, DoctorTimeEditing) {
  let shared = {};

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

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    let calendarTimesList = [];
    for (let i = 0; i < DOCTOR_CALENDAR.blockCounts; ++i) {
      calendarTimesList.push({
        blockNumber: i,
        time: TimeBlockConverter.blockToTime(DOCTOR_CALENDAR.beginHours, i)
      });
    }

    let daysInWeek = [];
    createDaysInWeek();

    $scope.$watch('my.currentWeek',
      (currentWeek) => {
        console.log('currentWeek has changed to:', currentWeek);
        createDaysInWeek();
      }, true);

    _.extend(my, {
      calendarTimesList: calendarTimesList,
      appointmentListByDate: {},
      doctorTimeListByDate: {},
      daysInWeek: daysInWeek,
      editing: false,
      editingGridByDate: {},
      doctorCalendarDays: [],

      // functions
      dateFormat: dateFormat,
      startEditing: startEditing,
      finishEditing: finishEditing,
      askChanges: askChanges,
      askDamage: askDamage,
      cancelEditing: cancelEditing,
      init: init,
      // this is intentionally put here
      public: my,
    });

    console.log('calendar-body my:', my);
    init(my.pureAppointmentList, my.pureDoctorTimeList);

    function init(appointmentList, doctorTimeList) {
      _.extend(my, {
        appointmentListByDate: sortAppointmentByDate(appointmentList),
        doctorTimeListByDate: sortDoctorTimeByDate(doctorTimeList),
      });
    }

    function createDaysInWeek() {
      for (let i = 0; i < 7; ++i) {
        daysInWeek[i] = moment(my.currentWeek).day(i).startOf('day');
      }
    }

    function makeEditingGrid() {
      let theGrid =
        DoctorTimeEditing.makeEditingGrid(my.doctorTimeListByDate);

      angular.copy(theGrid, my.editingGridByDate);
    }

    function startEditing() {
      console.log('start editing doctortime');
      console.log('doctorCalendarDay:', my.doctorCalendarDays);
      makeEditingGrid();
      my.editing = true;
      for (let each of my.doctorCalendarDays) {
        let dateString = my.dateFormat(each.date);
        each.startEditing(my.editingGridByDate[dateString]);
      }
    }

    function askDamage() {
      let damages = {};
      for (let each of my.doctorCalendarDays) {
        damages[my.dateFormat(each.date)] = each.askDamage();
      }
      return damages;
    }

    function askChanges() {
      console.log('stop editing doctortime');
      let changes = [];
      for (let each of my.doctorCalendarDays) {
        changes.push(each.askChanges());
      }

      return changes;
    }

    function finishEditing() {
      for (let each of my.doctorCalendarDays) {
        each.finishEditing();
      }
      my.editing = false;
    }

    function cancelEditing() {
      console.log('cancel editing doctortime');
      for (let each of my.doctorCalendarDays) {
        each.cancelEditing();
      }
      my.editing = false;
    }

  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);

    let $element = $(element);

    my.$body = $element.find('.doctor-calendar-body');
    my.$time = $element.find('.doctor-calendar-time');
    my.$week = $element.find('.doctor-calendar-week');

    my.$body.css({
      'padding-top': my.marginTop
    });
    my.$time.width(my.timeWidth);


    function setWeekWidth() {
      let windowWidth = $(window).width();
      my.$week.width(windowWidth - my.timeWidth);
      console.log(windowWidth - my.timeWidth);
    }

    setWeekWidth();

    $(window).resize(() => setWeekWidth());

    _.extend(my, {
      element: element,
      attrs: attrs,
    });
  }

  return {
    restrict: 'E',
    scope: {
      public: '=name',
      currentWeek: '=',
      pureAppointmentList: '=doctorAppointmentList',
      pureDoctorTimeList: '=doctorTimeList',
      marginTop: '=',
      timeWidth: '=',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: template,
  };

}
