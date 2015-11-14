/**
 * doctor seach
 * <doctor-search name="..."></doctor-search>
 *
 * api: doctorName
 */

import angular from 'angular';
import _ from 'lodash';

import 'angular-sanitize';
import 'ui-select/dist/select.js';
import 'ui-select/dist/select.css';

// services
import {doctorSearchServiceModule} from '../../../services/doctorSearch.service.js';

import doctorSearchTemplate from './doctor-search.template.html';

export let doctorSearchDirectiveModule =
  angular
    .module('doctorSearchearchDirectiveModule', [
      'ui.select',
      'ngSanitize',
      doctorSearchServiceModule.name,
    ])
    .directive('doctorSearch', doctorSearchDirective);

export function doctorSearchDirective(DoctorSearch) {
  let shared = {
    doctorList: [],
  };

  function controller () {
    getDoctorList();

    _.extend(this, {
      doctorList: shared.doctorList,
      form: {
        doctorName: '',
      },
      getDoctorList: getDoctorList
    });
  }

  function link($scope, element, attrs) {
    shared.element = element;
    shared.attrs = attrs;
  }

  function getDoctorList(name) {
    console.log('..');
    DoctorSearch
      .search(name)
      .then(
        (result) => {
          console.log('getDoctorlist:', result);
          angular.copy(result, shared.doctorList);
        });
  }

  return {
    restrict: 'E',
    scope: {
      form: '=name'
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'scope',
    link: link,
    template: doctorSearchTemplate,
  };
}
