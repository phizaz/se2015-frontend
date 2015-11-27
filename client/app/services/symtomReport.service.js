import angular from 'angular';
import _ from 'lodash';


// local
// import isLoginMock from './mocks/is-login.mock.json';

/*@ngInject*/ class SymtomReport {
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

  createSymtom() {
    let $q = this.private.$q;

    return $q(
      (resolve, reject) => {

      });
  }

  editSymtom(symtom) {
    let $q = this.private.$q;

    return $q(
      (resolve, reject) => {

      });
  }

  deleteSymtom(symtom) {
    let $q = this.private.$q;

    return $q(
      (resolve, reject) => {

      });
  }

}

export let symtomReportServiceModule =
  angular
    .module('symtomReportServiceModule', [
      ])
    .service('SymtomReport', SymtomReport);
