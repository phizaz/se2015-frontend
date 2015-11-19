import angular from 'angular';
import _ from 'lodash';

export class MakeAppointment {
  constructor($http, $q) {
    _.extend(this, {
      $http: $http,
      $q: $q,
    });
  }

  findOptionsByDoctor(doctor) {
    return this.$q(
      (resolve, reject) => {
        let possibleAppointments = [
          { datetime: new Date("2016-10-10T14:48:00"),
            doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
          { datetime: new Date("2015-10-10T12:00:00"),
            doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
          { datetime: new Date(),
            doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
          { datetime: new Date(),
            doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
          { datetime: new Date(),
            doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
        ];
        setTimeout(() => resolve(possibleAppointments), 1000);
      });
  }

  findOptionsBySpecialty(spectialy) {
    return this.$q(
      (resolve, reject) => {
        setTimeout(() => resolve(), 1000);
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

