import angular from 'angular';
import _ from 'lodash';

export let registerServiceModule =
angular.module('registerServiceModule', []);

export class Register {
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

  takeRegister(patient) {
    console.log('registering patient:', patient);


    return this.private.$q(
      (resolve, reject) => {
        this.private.$http
          .post('/api/register', patient)
          .then(
            (res) => {
              res = res.data;
              console.log('takeRegister res:', res);
              if (res.success) {
                resolve(res);
              } else {
                if (!res.message) {
                  console.error(res);
                  throw new Error('undefiend error');
                }
                reject(res);
              }
            })
          .catch(
            (res) => {
              console.error(res);
              throw new Error('register.takeRegister');
            });
      });

  }

}

registerServiceModule.service('Register', Register);
