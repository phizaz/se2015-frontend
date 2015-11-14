/**
 * specialty select
 * <specialty-select></specialty-select>
 */

import angular from 'angular';
import _ from 'lodash';

import specialtySelectTemplate from './specialty-select.template.html';

export let specialtySelectDirectiveModule =
  angular
    .module('specialtySelectDirectiveModule', [])
    .directive('specialtySelect', specialtySelectDirective);

export function specialtySelectDirective() {
  let shared = {};

  function controller () {
    _.extend(this, {
      form: {
        specialty: '',
      },
    });
  }

  function link($scope, element, attrs) {
    shared.element = element;
    shared.attrs = attrs;
  }

  return {
    restrict: 'E',
    scope: {

    },
    bindToController: true,
    controller: controller,
    controllerAs: 'modal',
    link: link,
    template: specialtySelectTemplate,
  };
}
