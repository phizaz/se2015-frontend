import angular from 'angular';
import _ from 'lodash';

// import doctorList from './mocks/doctorList.mock.json';
import specialtyList from './mocks/specialtyList.mock.json';

let partial  =
  angular
    .module('doctorSearchServiceModule', []);

export default partial.name;

partial.service('DoctorSearch', ($http, $q) => {
  class DoctorSearch {

    constructor () {
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

          this.private.$http
            .get('/api/doctor')
            .then(
              (res) => {
                res = res.data;

                if (res.success) {
                  resolve(res.data);
                } else {
                  console.log(res);
                  throw new Error('getdoctorlist');
                }
              })
            .catch(
              (res) => {
                console.log(res);
                throw new Error('getdoctorlist');
              });

        });
    }

    getSpecialtyList() {
      return this.private.$q(
        (resolve, reject) => {
          resolve(specialtyList);
        });
    }

  }

  return new DoctorSearch();
});


