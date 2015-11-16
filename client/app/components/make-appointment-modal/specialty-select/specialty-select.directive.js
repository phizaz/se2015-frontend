/**
 * specialty select
 * <specialty-select></specialty-select>
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

  function getSpecialtyList() {
    Doctor
      .getSpecialtyList()
      .then((result) => {
        console.log('specialtyList:', result);
        angular.copy(result, shared.specialtyList);
      });
  }
  getSpecialtyList();

  function controller ($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    _.extend(my, {
      specialtyList: shared.specialtyList,
      form: {
        specialty: null,
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
      form: '=name'
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'scope',
    link: link,
    template: specialtySelectTemplate,
  };
}
