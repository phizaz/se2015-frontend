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

    // this
    //   .takeLogout()
    //   .then(
    //     (res) => {
    //       console.log('takeLogout:', res);
    //     })
    //   .catch(
    //     (res) => {
    //       console.log('not takeLogout:', res);
    //     });

    // this
    //   .takeLogin('test', '1234')
    //   .then(
    //     (res) => {
    //       console.log('login:', res);
    //     })
    //   .catch(
    //     (res) => {
    //       console.log('not login:', res);
    //     });


    // this
    //   .isLogin()
    //   .then((res) => {
    //     console.log('isLogin:', res);
    //   })
    //   .catch((res) => {
    //     console.log('not isLogin:', res);
    //   });

    // this
    //   .userInfo()
    //   .then((res) => {
    //     console.log('userInfo:', res);
    //   })
    //   .catch((res) => {
    //     console.log('not userInfo:', res);
    //   });



  }

  takeLogin(username,password) {
    let Cache = this.private.Cache;
    let $q = this.private.$q;
    let $http=  this.private.$http;

    return $q(
      (resolve, reject) => {
        $http.
          post('/api/login', {
            username: username,
            password: password,
          })
          .then(
            (res) => {
              // this is important
              res = res.data;

              if (res.success) {

                Cache.setCache('is-login', {
                  login: true,
                  data: res.data
                });

                resolve(res);
              } else {
                if (!res.message) {
                  throw new Error('undefine error', res);
                }

                reject(res);
              }
            })
          .catch(
            (res) => {
              throw new Error(res);
            });
      });
  }

  takeLogout() {
    let $http = this.private.$http;
    let Cache = this.private.Cache;
    let $q = this.private.$q;

    return $q(
      (resolve, reject) => {
        $http
          .post('/api/logout')
          .then(
            (res) => {
              res = res.data;

              Cache.setCache('is-login', {
                login: false
              });

              if (res.success) {
                resolve(res);
              } else {
                reject(res);
              }
            })
          .catch(
            (res) => {
              throw new Error(res);
            });
      });
  }

  isLoginFresh() {
    // console.log('getting fresh isLogin');

    let $http = this.private.$http;
    let Cache = this.private.Cache;
    let $q = this.private.$q;
    let CallOnce = this.private.CallOnce;

    return CallOnce.call(realRequest);

    function realRequest() {
      return $q(
        (resolve, reject) => {
          $http
            .get('/api/is-login')
            .then(
              (res) => {
                // this is important
                res = res.data;

                // set cache
                Cache.setCache('is-login', res);

                console.log('isLoginFresh:', res);
                if (res.login) {
                  resolve(res);
                } else {
                  reject(res);
                }
              })
            .catch(
              (res) => {
                throw new Error(res);
              });
          });
    }

    // function mockRequest() {
    //   // console.log('really do http request');
    //   return $q(
    //     (resolve, reject) => {
    //       let delay = 10;
    //       setTimeout(() => {
    //         // set cache
    //         Cache.setCache('is-login', isLoginMock);

    //         resolve(isLoginMock);
    //       }, delay);
    //     });
    // }

  }

  isLogin() {
    // console.log('getting isLogin..');

    let $q = this.private.$q;
    let Cache = this.private.Cache;

    return $q(
      (resolve, reject) => {
        if (Cache.isValid('is-login')) {
          let cache = Cache.getCache('is-login');
          if (cache.login) {
            resolve(cache);
          } else {
            reject(cache);
          }
        } else {
          this
            .isLoginFresh()
            .then((res) => {
              resolve(res);
              console.log('isLogin: ', res);
            })
            .catch((res) => {
              console.log('not isLogin:', res);
              reject(res);
            });
        }
      });
  }

  userInfo() {
    let $q = this.private.$q;
    return $q(
      (resolve, reject) => {
        this.isLogin()
          .then((res) => {
            resolve(res.data);
          })
          .catch((res) => {
            reject(res);
          });
      });
  }

  toHisOwnPage() {
    console.log('toHisOwnPage');
    let $q = this.private.$q;
    return $q(
      (resolve, reject) => {
        this.isLogin()
          .then((res) => {
            console.log('toHisOwnPage login;', res);
            // logged in
            let data = res.data;
            let redirect = null;
            if (data.role) {
              if (data.role === 'Doctor') {
                redirect = 'doctor';
              } else if (data.role === 'Staff') {
                redirect = 'staff';
              } else if (data.role === 'Nurse') {
                redirect = 'nurse';
              } else if (data.role === 'Pharmacist') {
                redirect = 'pharmacist';
              } else {
                throw new Error('wrong role', res);
              }
            } else {
              redirect = 'patient';
            }

            reject({
              redirect: redirect
            });
          })
          .catch((res) => {
            console.log('toHisOwnPage not login:', res);
            // not logged in
            resolve(res);
          });
      });
  }

}

loginServiceModule.service('Login', Login);
