/**
 * doctor seach
 * <doctor-search name="..."></doctor-search>
 *
 * api: doctorName
 */

import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../../directive.js';

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
  // this will be the same across the directive of this kind
  let shared = {
    doctorList: [],
  };

  // this will be done only once no mattter how many instances
  function getDoctorList() {
    Doctor
      .getDoctorList()
      .then((result) => angular.copy(result, shared.doctorList));
  }
  getDoctorList();

  function controller ($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    _.extend(my, {
      doctorList: shared.doctorList,
      form: {
        doctor: null,
      },
    });
  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);

    my.element = element;
    my.attrs = attrs;
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
