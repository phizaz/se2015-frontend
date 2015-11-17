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

    function change() {
      console.log('changed!');
      my.onChange();
    }

    _.extend(my, {
      doctorList: shared.doctorList,
      doctor: null,

      change: change,
      // this is put here intentionally
      public: my,
    });
  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);
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
