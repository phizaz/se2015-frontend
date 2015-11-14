import angular from 'angular';
import _ from 'lodash';

import doctorSearchList from './doctorSearch.mock.json';

export let doctorSearchServiceModule =
  angular.module('doctorSearchServiceModule', []);

export class DoctorSearch {
  constructor($http) {
    this.private = {};
    this.private.$http = $http;
  }

  search(name) {
    return new Promise(
      (resolve, reject) => {
        resolve(this.searchMock(name));
      });
  }

  searchMock() {
    return doctorSearchList;
  }
}

doctorSearchServiceModule
  .service('DoctorSearch', DoctorSearch);
