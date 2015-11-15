import angular from 'angular';
import _ from 'lodash';

import doctorList from './mocks/doctorList.mock.json';
import specialtyList from './mocks/specialtyList.mock.json';

export let doctorServiceModule =
  angular.module('doctorServiceModule', []);

export class Doctor {

  constructor ($http) {
    this.private = {};
    this.private.$http = $http;
  }

  getDoctorList() {
    return new Promise(
      (resolve, reject) => {
        resolve(this.getDoctorListMock());
      });
  }

  getDoctorListMock() {
    return doctorList;
  }

  getSpecialtyList() {
    return new Promise(
      (resolve, reject) => {
        resolve(this.getSpecialtyListMock());
      });
  }

  getSpecialtyListMock() {
    return specialtyList;
  }
}

doctorServiceModule.service('Doctor', Doctor);
