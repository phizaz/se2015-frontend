import angular from 'angular';
import moment from 'moment';
import _ from 'lodash';

let partial =
  angular.module('DoctorCalendarStoreModule', []);

export default partial.name;

partial.store('DoctorCalendarStore', (flux) => {

  let state = flux.immutable({
    currentWeek: moment(),
  });

  return {
    handlers: {

    },

  };
});
