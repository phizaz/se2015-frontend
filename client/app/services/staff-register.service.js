import angular from 'angular';
import _ from 'lodash';

export /*@ngInject*/ class StaffRegister {
  constructor($http, $q) {

    // set private vars (although this is not the real private, but the real private is not all that good it reduces testablitiy)
    this.private = {};
    _.extend(this.private, {
      $http: $http,
      $q: $q,
    });

    // set public vars (if any)
    _.extend(this, {
    });
  }

  takeRegister(staff) {
    console.log('registering staff:', staff);

    return this.private.$q(
      (resolve, reject) => {

        this.private.$http
          .post('/api/register-employee', staff)
          .then(
            (res) => {
              res = res.data;
              console.log('staff register res:', res);

              if (res.success) {
                resolve(res);
              } else {
                if (!res.messages || !res.massages.length) {
                  console.log(res);
                  throw new Error('undefined error');
                }
                reject(res.massages);
              }
            })
          .catch(
            (res) => {
              console.log(res);
              throw new Error('staff register');
            });

      });
  }

  userExists(username) {

    return this.private.$q(
      (resolve, reject) => {

        this.priavte.$http
          .get('/api/register-employee/username-exists/' + username)
          .then(
            (res) => {
              res = res.data;

              if (res.found) {
                resolve(res);
              } else {
                reject(res);
              }

            })
          .catch(
            (res) => {
              console.log(res);
              throw new Error('userexitsts');
            });
      });
  }

}

export let staffRegisterServiceModule =
  angular
    .module('staffRegisterServiceModule', [])
    .service('StaffRegister', StaffRegister);
