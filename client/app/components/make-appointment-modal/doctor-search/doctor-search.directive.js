/**
 * doctor seach
 * <doctor-search name="..."></doctor-search>
 *
 * api: doctorName
 */

import angular from 'angular';
import _ from 'lodash';

// services
import {doctorSearchServiceModule} from '../../../services/doctorSearch.service.js';

import doctorSearchTemplate from './doctor-search.template.html';

export let doctorSearchDirectiveModule =
  angular
    .module('doctorSearchDirectiveModule', [
      doctorSearchServiceModule.name,
    ])
    .directive('doctorSearch', doctorSearchDirective);

export function doctorSearchDirective(DoctorSearch) {
  let shared = {};

  function controller () {
    _.extend(this, {
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
