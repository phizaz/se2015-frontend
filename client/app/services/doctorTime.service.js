import angular from 'angular';
import _ from 'lodash';

import doctorTimeList from './mocks/doctorTimeList.mock.json';

export class DoctorTime{
  constructor($http, $q) {
    this.private = {};
    _.extend(this, {
      $http: $http,
      $q: $q,
    });
  }

  getDoctorTimeList(doctor) {
    if (!doctor.emp_id) {
      throw new Error('doctor.emp_id not found');
    }

    let $q = this.private.$q;

    return $q(
      (resolve, reject) => {
        let delay = 10;
        setTimeout(() => resolve(doctorTimeList), delay);
      });
  }

  updateDoctorTime(doctorTime) {
    if (!doctorTime.startTime ||
        !doctorTime.endTime) {
      throw new Error('doctorTime is not satisfied');
    }

    // todo...
  }

  createDoctorTime() {

  }

  deleteDoctorTime(doctorTime) {
    if (!doctorTime.startTime ||
        !doctorTime.endTime) {
      throw new Error('doctorTime is not satisfied');
    }

    // todo...
  }
}

export let doctorTimeServiceModule =
  angular
    .module('doctorTimeServiceModule', [])
    .service('DoctorTime', DoctorTime);
