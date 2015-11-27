import angular from 'angular';
import _ from 'lodash';

let partial =
  angular.module('registerServiceModule', []);

export default partial.name;

partial.service('Register', ($http, $q) => {
  class Register {
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
                    console.log(res);
                    throw new Error('undefiend error');
                  }
                  reject(res.messages);
                }
              })
            .catch(
              (res) => {
                console.log(res);
                throw new Error('register.takeRegister');
              });
        });

    }

  }

  return new Register();
});
