import angular from 'angular';
import _ from 'lodash';

import doctorList from './mocks/doctorList.mock.json';
import specialtyList from './mocks/specialtyList.mock.json';

export let doctorServiceModule =
  angular.module('doctorServiceModule', []);

export class Doctor {

  constructor ($http, $q) {
    this.private = {};
    _.extend(this.private, {
      $http: $http,
      $q: $q,
    });

    _.extend(this, {

    });
  }

  getDoctorList() {
    return this.private.$q(
      (resolve, reject) => {
        resolve(this.getDoctorListMock());
      });
  }

  getDoctorListMock() {
    return doctorList;
  }

  getSpecialtyList() {
    return this.private.$q(
      (resolve, reject) => {
        resolve(this.getSpecialtyListMock());
      });
  }

  getSpecialtyListMock() {
    return specialtyList;
  }
}

doctorServiceModule.service('Doctor', Doctor);
