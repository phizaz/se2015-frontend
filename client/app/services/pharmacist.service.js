import angular from 'angular';
import _ from 'lodash';

// local
import patientInfoMock from './mocks/get-patient.mock.json';
import staffInfoMock from './mocks/get-staff.mock.json';
export let pharmacistServiceModule =
  angular.module('pharmacistServiceModule', []);

export /*@ngInject*/ class Pharmacist {
  constructor($http, $q) {

    // set private vars (although this is not the real private, but the real private is not all that good it reduces testablitiy)
    this.private = {};
    this.private.$http = $http;
    this.private.$q = $q;

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
  pharmacistInfo(){
    let $q = this.private.$q;
    return $q(
        (resolve,reject) => {
            resolve(patientInfoMock.data);
        });
  }
  takePharmacist(photo,firstname,lastname,address,telephone,email,sex,nation,religion,blood,pid,password) {
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

pharmacistServiceModule.service('Pharmacist', Pharmacist);
