import angular from 'angular';
import moment from 'moment';
import _ from 'lodash';

const partial =
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
