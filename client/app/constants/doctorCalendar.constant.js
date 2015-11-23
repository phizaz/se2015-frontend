import angular from 'angular';
import _ from 'lodash';

export const DOCTOR_CALENDAR = {
  beginHours: 8,
  blockCounts: 40,
  blockHeight: 65,
  blockPadding: 4,
};

export let doctorCalendarConstantModule =
  angular
    .module('doctorCalendarConstantModule', [])
    .constant('DOCTOR_CALENDAR', DOCTOR_CALENDAR);
