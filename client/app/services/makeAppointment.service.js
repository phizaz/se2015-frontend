import angular from 'angular';
import _ from 'lodash';

export class MakeAppointment {
  constructor($http, $q) {
    _.extend(this, {
      $http: $http,
      $q: $q,
    });
  }

  bookAppointment(appointment) {
    return this.$q(
      (resolve, reject) => {
        setTimeout(() => resolve(), 1000);
      });
  }

  unbookAppointment() {
    // the booked one
    return this.$q(
      (resolve, reject) => {
        setTimeout(() => resolve(), 1000);
      });
  }

  makeAppointment() {
    // the booked one
    return this.$q(
      (resolve, reject) => {
        setTimeout(() => resolve(), 1000);
      });
  }


}

export let makeAppointmentServiceModule =
  angular
    .module('makeAppointmentServiceModule', [])
    .service('MakeAppointment', MakeAppointment);

