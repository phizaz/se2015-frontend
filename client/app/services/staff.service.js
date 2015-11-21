import angular from 'angular';
import _ from 'lodash';

export let staffServiceModule =
  angular.module('staffServiceModule', []);

export class Staff {
  constructor($http) {

    // set private vars (although this is not the real private, but the real private is not all that good it reduces testablitiy)
    this.private = {};
    this.private.$http = $http;

    // set public vars (if any)
    _.extend(this, {
    });
  }

  takeStaff(photo,firstname,lastname,address,telephone,email,sex,nation,religion,blood,pid,password) {
    console.log(firstname);
    console.log(lastname);
    console.log(address);
    console.log(telephone);
    console.log(email);
    console.log(sex);
    console.log(nation);
    console.log(religion);
    console.log(blood);
    console.log(pid);
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

staffServiceModule.service('Staff', Staff);
