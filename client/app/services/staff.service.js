import angular from 'angular';
import _ from 'lodash';

// local
import patientInfoMock from './mocks/get-patient.mock.json';
import staffInfoMock from './mocks/get-staff.mock.json';
export let staffServiceModule =
  angular.module('staffServiceModule', []);

export class Staff {
  constructor($http, $q) {

    // set private vars (although this is not the real private, but the real private is not all that good it reduces testablitiy)
    this.private = {};
    _.extend(this.private, {
      $http: $http,
      $q: $q
    });

    // set public vars (if any)
    _.extend(this, {

    });
  }
  patientInfo(){
    let $q = this.private.$q;
    return $q(
        (resolve,reject) => {
            resolve(staffInfoMock.data);
        });
  }
  staffInfo(){
    let $q = this.private.$q;
    return $q(
        (resolve,reject) => {
            resolve(patientInfoMock.data);
        });
  }

}

staffServiceModule.service('Staff', Staff);
