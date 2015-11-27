import angular from 'angular';
import _ from 'lodash';


export /*@ngInject*/ class DrugRecord {
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

  createDrug() {
    let $q = this.private.$q;

    return $q(
      (resolve, reject) => {

      });
  }

  editDrug(drug) {
    let $q = this.private.$q;

    return $q(
      (resolve, reject) => {

      });
  }

  deleteDrug(drug) {
    let $q = this.private.$q;

    return $q(
      (resolve, reject) => {

      });
  }

}

export let drugRecordServiceModule =
  angular
    .module('drugRecordServiceModule', [
      ])
    .service('DrugRecord', DrugRecord);
