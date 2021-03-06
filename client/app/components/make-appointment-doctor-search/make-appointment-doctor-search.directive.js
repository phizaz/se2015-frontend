/**
 * doctor seach
 * <doctor-search name="..."></doctor-search>
 *
 * api: doctorName
 */

import angular from 'angular';
import _ from 'lodash';
import Directive from '../directive.js';

import 'angular-sanitize';
import 'ui-select/dist/select.js';
import 'ui-select/dist/select.css';

// selector theme
import 'selectize/dist/css/selectize.default.css';

import doctorSearchTemplate from './make-appointment-doctor-search.template.html';
import './make-appointment-doctor-search.sass';

const partial =
  angular
    .module('doctorSearchearchDirectiveModule', [
      'ui.select',
      'ngSanitize',
      // services
      require('../../services/doctorSearch.service'),
    ]);

export default partial.name;

partial.directive('doctorSearch', doctorSearchDirective);

function doctorSearchDirective(DoctorSearch) {
  // this will be the same across the directive of this kind
  let shared = {
    loadingDoctorList: false,
    doctorList: [],
  };

  // this will be done only once no mattter how many instances
  function getDoctorList() {
    shared.loadingDoctorList = true;

    DoctorSearch
      .getDoctorList()
      .then((result) => {
        console.log('doctor search result:', result);
        shared.loadingDoctorList = false;

        angular.copy(result, shared.doctorList);
      });
  }
  getDoctorList();

  function controller ($scope) {
    let my = Directive.constructor($scope, this);

    function change() {
      console.log('changed!');
      my.onChange();
    }

    _.extend(my, {
      shared: shared,
      doctorList: shared.doctorList,

      doctor: null,

      change: change,
      // this is put here intentionally
      public: my,
    });
  }

  function link($scope, element, attrs) {
    let my = Directive.getPrivate($scope);
    _.extend(my, {
      element: element,
      attrs: attrs,
    });
  }

  return {
    restrict: 'E',
    scope: {
      public: '=name',
      onChange: '&',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: doctorSearchTemplate,
  };
}
