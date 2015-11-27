import angular from 'angular';
import _ from 'lodash';

// // local
// import isLoginMock from './mocks/is-login.mock.json';

let partial =
  angular.module('loginServiceModule', [
    require('./cache.service'),
    require('./callOnce.service'),
    ]);

export default partial.name;

partial.service('Login', ($http, Cache, $q, CallOnce) => {
  class Login {
    constructor() {

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

      return CallOnce.call('is-login', realRequest);

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
                  console.log(res);
                  throw new Error('login.service.isloginFresh');
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
              // this is intended to be able to resolve only
              resolve(res.data);
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

              let map = {
                Doctor: 'doctor',
                Staff: 'staff',
                Pharmacist: 'pharmacist',
                Nurse: 'nurse',
              };

              if (data.role) {
                if (!map[data.role]) {
                  console.log(res);
                  throw new Error('mappnig not found');
                }
                redirect = map[data.role];
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

    isPatient(){
      let $q = this.private.$q;
      return $q(
        (resolve, reject) => {
          this.isLogin()
            .then(
              (res) => {
                if (!res.data.role) {
                  resolve(res.data);
                } else {
                  reject({ redirect: 'home' });
                }
              })
            .catch(
              (res) => {
                reject({ redirect: 'home' });
              });
        });
    }

    isEmployee(){
      let $q = this.private.$q;
      return $q(
        (resolve, reject) => {
          this.isLogin()
            .then(
              (res) => {
                if (res.data.role) {
                  resolve(res.data);
                } else {
                  reject({ redirect: 'home' });
                }
              })
            .catch(
              (res) => {
                reject({ redirect: 'home' });
              });
        });
    }

    isDoctor(){
      let $q = this.private.$q;
      return $q(
        (resolve, reject) => {
          this.isLogin()
            .then(
              (res) => {
                if (res.data.role === 'Doctor') {
                  resolve(res.data);
                } else {
                  reject({ redirect: 'home' });
                }
              })
            .catch(
              (res) => {
                reject({ redirect: 'home' });
              });
        });
    }

    isStaff(){
      let $q = this.private.$q;
      return $q(
        (resolve, reject) => {
          this.isLogin()
            .then(
              (res) => {
                if (res.data.role === 'Staff') {
                  resolve(res.data);
                } else {
                  reject({ redirect: 'home' });
                }
              })
            .catch(
              (res) => {
                reject({ redirect: 'home' });
              });
        });
    }

    isNurse() {
      let $q = this.private.$q;
      return $q(
        (resolve, reject) => {
          this.isLogin()
            .then(
              (res) => {
                if (res.data.role === 'Nurse') {
                  resolve(res.data);
                } else {
                  reject({ redirect: 'home' });
                }
              })
            .catch(
              (res) => {
                reject({ redirect: 'home' });
              });
        });
    }

    isPharmacist() {
      let $q = this.private.$q;
      return $q(
        (resolve, reject) => {
          this.isLogin()
            .then(
              (res) => {
                if (res.data.role === 'Pharmacist') {
                  resolve(res.data);
                } else {
                  reject({ redirect: 'home' });
                }
              })
            .catch(
              (res) => {
                reject({ redirect: 'home' });
              });
        });
    }
  }

  return new Login();

});
