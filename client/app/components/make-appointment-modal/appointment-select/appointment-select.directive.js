/**
 * appointment select
 * <appointment-select name="..."></appoinment-select>
 *
 *
 */

import angular from 'angular';
import _ from 'lodash';

import appointmentSelectTemplate from './appointment-select.template.html';
import './appointment-select.sass';

export let appointmentSelectDirectiveModule =
  angular
    .module('appointmentSelectDirectiveModule', [])
    .directive('appointmentSelect', appointmentSelect);

export function appointmentSelect() {
  let shared;


  function controller() {
    shared = this;

    _.extend(shared, {
      public: {
        show: showModal
      }
    });
  }

  function link($scope, element, attrs) {
    shared.element = element;
    shared.attrs = attrs;

    showModal();
  }

  function showModal() {
    shared.element.children('.modal').openModal();
  }

  return {
    restrict: 'E',
    scope: {
      public: '=name'
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'appointment',
    link: link,
    template: appointmentSelectTemplate,
  };
}
