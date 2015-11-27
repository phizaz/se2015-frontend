import angular from 'angular';
import _ from 'lodash';

// local
// import patientInfoMock from './mocks/get-patient.mock.json';
// import staffInfoMock from './mocks/get-staff.mock.json';
//
let partial =
  angular.module('staffServiceModule', []);

export default partial.name;

partial.service('Staff', ($http, $q) => {

  class Staff {
    constructor() {

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

    getPatient(firstname, lastname) {
      return this.private.$q(
        (resolve, reject) => {

          this.private.$http(
            {
              method: 'GET',
              url: '/api/staff/get-patient/',
              params: {
                firstname: firstname,
                lastname: lastname,
              }
            })
            .then(
              (res) => {
                res = res.data;
                console.log('get patient res:', res);
                if (res.success) {
                  resolve(res.data);
                } else {
                  console.log(res);
                  throw new Error('staff get patient');
                }
              })
            .catch(
              (res) => {
                console.log(res);
                throw new Error('staff get patient');
              });

        });
    }

    getUnconfirmedStaff() {
      return this.private.$q(
        (resolve, reject) => {

          this.private.$http(
            {
              method: 'GET',
              url: '/api/staff/get-unconfirmed-staff'
            })
            .then(
              (res) => {
                res = res.data;
                console.log('get unconfirmed staff res: ', res);
                if (res.success) {
                  resolve(res.data);
                } else {
                  console.log(res);
                  throw new Error('staff get unconfirmed staff');
                }
              })
            .catch(
              (res) => {
                console.log(res);
                throw new Error('staff get unconfirmed staff');
              });

        });
    }

    approveStaff(employee) {
      if (!employee.emp_id) {
        console.log(employee);
        throw new Error('no emp_id');
      }

      return this.private.$q(
        (resolve, reject) => {

          this.private.$http
            .post('/api/staff/approve-staff/' + employee.emp_id)
            .then(
              (res) => {
                res = res.data;
                console.log('approve staff res:', res);

                if (res.success) {
                  resolve(res.data);
                } else {
                  if (!res.messages || !res.messages.length) {
                    console.log(res);
                    throw new Error('staff get approve staff');
                  }

                  reject(res.messages);
                }
              })
            .catch(
              (res) => {
                console.log(res);
                throw new Error('staff get approve staff');
              });

        });
    }

    discardStaff(employee) {
      if (!employee.emp_id) {
        console.log(employee);
        throw new Error('no emp_id');
      }

      return this.private.$q(
        (resolve, reject) => {

          this.private.$http
            .post('/api/staff/discard-staff/' + employee.emp_id)
            .then(
              (res) => {
                res = res.data;
                console.log('discard staff res:', res);

                if (res.success) {
                  resolve(res.data);
                } else {
                  if (!res.messages || !res.messages.length) {
                    console.log(res);
                    throw new Error('staff get discard staff');
                  }

                  reject(res.messages);
                }
              })
            .catch(
              (res) => {
                console.log(res);
                throw new Error('staff get discard staff');
              });

        });
    }

  }

  return new Staff();
});
