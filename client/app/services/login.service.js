import angular from 'angular';
import _ from 'lodash';

import {cacheServiceModule} from './cache.service';
import {callOnceServiceModule} from './callOnce.service';

// local
import isLoginMock from './mocks/is-login.mock.json';

export let loginServiceModule =
angular.module('loginServiceModule', [
  cacheServiceModule.name,
  callOnceServiceModule.name,
  ]);

export class Login {
  constructor($http, Cache, $q, CallOnce) {

    // set private vars (although this is not the real private, but the real private is not all that good it reduces testablitiy)
    this.private = {};
    _.extend(this.private, {
      $http: $http,
      Cache: Cache,
      $q: $q,
      CallOnce: CallOnce,
    });

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

  isLoginFresh() {
    // console.log('getting fresh isLogin');

    let $http = this.private.$http;
    let Cache = this.private.Cache;
    let $q = this.private.$q;
    let CallOnce = this.private.CallOnce;

    // real function
    // return $q(
    //     (resolve, reject) => {
    //         $http
    //             .get('/api/is-login')
    //             .then(
    //                 (res) => {
    //                     Cache.setCache('is-login', res);
    //                 });
    //     });

    // mock function
    return CallOnce.call(mockRequest);

    function mockRequest() {
      // console.log('really do http request');
      return $q(
        (resolve, reject) => {
          let delay = 10;
          setTimeout(() => {
            // set cache
            Cache.setCache('is-login', isLoginMock);

            resolve(isLoginMock);
          }, delay);
        });
    }

  }

  isLogin() {
    // console.log('getting isLogin..');

    let $q = this.private.$q;
    let Cache = this.private.Cache;

    return $q(
      (resolve, reject) => {
        if (Cache.isValid('is-login')) {
          resolve(Cache.getCache('is-login'));
        } else {
          this.isLoginFresh().then((res) => resolve(res));
        }
      });
  }

}

loginServiceModule.service('Login', Login);
