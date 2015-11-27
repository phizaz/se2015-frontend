/**
 * specialty select
 * <specialty-select></specialty-select>
 */

import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive.js';

import 'angular-sanitize';
import 'ui-select/dist/select.js';
import 'ui-select/dist/select.css';

// selector theme
import 'selectize/dist/css/selectize.default.css';

import {doctorSearchServiceModule} from '../../services/doctorSearch.service';

import specialtySelectTemplate from './make-appointment-specialty-select.template.html';
import './make-appointment-specialty-select.sass';

export let specialtySelectDirectiveModule =
  angular
    .module('specialtySelectDirectiveModule', [
      'ui.select',
      'ngSanitize',
      doctorSearchServiceModule.name,
    ])
    .directive('specialtySelect', specialtySelectDirective);

function specialtySelectDirective(DoctorSearch) {
  let shared = {
    specialtyList: [],
  };

  function getSpecialtyList() {
    DoctorSearch
      .getSpecialtyList()
      .then((result) => {
        console.log('specialtyList:', result);
        angular.copy(result, shared.specialtyList);
      });
  }
  getSpecialtyList();

  function controller ($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    function change() {
      my.onChange();
    }

    _.extend(my, {
      specialtyList: shared.specialtyList,
      specialty: null,

      change: change,

      // this is intentionally put here
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
    template: specialtySelectTemplate,
  };
}
