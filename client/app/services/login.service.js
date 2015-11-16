import angular from 'angular';
import _ from 'lodash';

export let loginServiceModule =
  angular.module('loginServiceModule', []);

export class Login {
  constructor($http) {

    // set private vars (although this is not the real private, but the real private is not all that good it reduces testablitiy)
    this.private = {};
    this.private.$http = $http;

    // set public vars (if any)
    _.extend(this, {
    });
  }

  takeLogin(username,password) {
    console.log(username);
    console.log(password);
    return new Promise(
      (resolve, reject) => {


        // resolve({
        //  userTye:
        // });

        // this.priavte.$http.post('/api/..', {
        //   username: '',
        //   password: '...',
        // })
        //   .then(
        //     (userInfo) => {
        //       resolve(userInfo);
        //     })
        //   .catch(
        //     (message) => {
        //       // 400
        //       if (message.info === 'validateFail') {
        //         reject(...);
        //       } else {
        //         throw new Error('aoeuaoeu');
        //       }

        //     });

      });

  }

}

loginServiceModule.service('Login', Login);
