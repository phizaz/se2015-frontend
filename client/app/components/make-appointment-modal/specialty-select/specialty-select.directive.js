/**
 * specialty select
 * <specialty-select></specialty-select>
 */

import angular from 'angular';
import _ from 'lodash';

import 'angular-sanitize';
import 'ui-select/dist/select.js';
import 'ui-select/dist/select.css';

// selector theme
import 'selectize/dist/css/selectize.default.css';

import {doctorServiceModule} from '../../../services/doctor.service.js';

import specialtySelectTemplate from './specialty-select.template.html';
import './specialty-select.sass';

export let specialtySelectDirectiveModule =
  angular
    .module('specialtySelectDirectiveModule', [
      doctorServiceModule.name,
    ])
    .directive('specialtySelect', specialtySelectDirective);

export function specialtySelectDirective(Doctor) {
  let shared = {
    specialtyList: [],
  };

  function controller () {
    getSpecialtyList();

    _.extend(this, {
      specialtyList: shared.specialtyList,
      form: {
        specialty: '',
      },
    });
  }

  function link($scope, element, attrs) {
    shared.element = element;
    shared.attrs = attrs;


  }

  function getSpecialtyList() {
    Doctor
      .getSpecialtyList()
      .then((result) => {
        console.log('specialtyList:', result);
        angular.copy(result, shared.specialtyList);
      });
  }

  return {
    restrict: 'E',
    scope: {
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'scope',
    link: link,
    template: specialtySelectTemplate,
  };
}
