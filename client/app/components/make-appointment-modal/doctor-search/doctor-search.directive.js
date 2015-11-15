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

// selector theme
import 'selectize/dist/css/selectize.default.css';

import {doctorServiceModule} from '../../../services/doctor.service.js';

import doctorSearchTemplate from './doctor-search.template.html';
import './doctor-search.sass';

export let doctorSearchDirectiveModule =
  angular
    .module('doctorSearchearchDirectiveModule', [
      'ui.select',
      'ngSanitize',
      doctorServiceModule.name,
    ])
    .directive('doctorSearch', doctorSearchDirective);

export function doctorSearchDirective(Doctor) {
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
    });
  }

  function link($scope, element, attrs) {
    shared.element = element;
    shared.attrs = attrs;
  }

  function getDoctorList() {
    Doctor
      .getDoctorList()
      .then((result) => angular.copy(result, shared.doctorList));
  }

  return {
    restrict: 'E',
    scope: {
      form: '=name',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'scope',
    link: link,
    template: doctorSearchTemplate,
  };
}
