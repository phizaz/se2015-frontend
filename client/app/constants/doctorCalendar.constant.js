import angular from 'angular';
import _ from 'lodash';

const DOCTOR_CALENDAR = {
  beginHours: 8,
  blockCounts: 40,
  blockHeight: 65,
  blockPadding: 4,
};

const partial =
  angular.module('doctorCalendarConstantModule', []);

export default partial.name;

partial.constant('DOCTOR_CALENDAR', DOCTOR_CALENDAR);
