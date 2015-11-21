import angular from 'angular';
import _ from 'lodash';
import moment from 'moment';
import {DirectiveBlueprint} from '../directive';

// directives
import {doctorCalendarDayDirectiveModule} from '../doctor-calendar-day/doctor-calendar-day.directive';

// locals
import template from './doctor-calendar-body.template.html';
import './doctor-calendar-body.sass';

export let doctorCalendarBodyDirectiveModule =
  angular
    .module('doctorCalendarBodyDirectiveModule', [
      doctorCalendarDayDirectiveModule.name,
      ])
    .directive('doctorCalendarBody', doctorCalendarBodyDirective);

export function doctorCalendarBodyDirective() {
  let shared = {};

  function blockToTime(beginHours, blockNumber) {
    // block number shall start from 0
    // since block is 15 minutes
    let hoursPassed = blockNumber / 4;
    let minutesPassed = (blockNumber % 4) * 15;

    // console.log('hoursPassed:', hoursPassed);
    // console.log('minutesPassed:', minutesPassed);

    let time =
      moment({
        hour: beginHours + hoursPassed,
        minute: minutesPassed
      });

    return time;
  }

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
    for (let i = 0; i < my.blockCounts; ++i) {
      calendarTimesList.push({
        blockNumber: i,
        time: blockToTime(my.beginHours, i)
      });
    }

    let daysInWeek = [];
    $scope.$watch('my.currentWeek',
      (currentWeek) => {
        for (let i = 0; i < 7; ++i) {
          daysInWeek[i] = moment(currentWeek).day(i);
        }
      });

    _.extend(my, {
      calendarTimesList: calendarTimesList,
      doctorAppointmentList: sortAppointmentByDate(my.pureAppointmentList),
      doctorTimeList: sortDoctorTimeByDate(my.pureDoctorTimeList),
      daysInWeek: daysInWeek,

      dateFormat: dateFormat,
      // this is intentionally put here
      public: my,
    });

    console.log('calendar-body my:', my);
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
      currentWeek: '=',
      pureAppointmentList: '=doctorAppointmentList',
      pureDoctorTimeList: '=doctorTimeList',
      beginHours: '=',
      blockCounts: '=',
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
