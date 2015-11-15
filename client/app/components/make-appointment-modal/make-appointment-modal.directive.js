/**
 * make appointment modal
 * <make-appointment-modal name="..."></make-appointment-modal>
 *
 * api: show()
 */

import angular from 'angular';
import _ from 'lodash';

// directives
import {doctorSearchDirectiveModule} from './doctor-search/doctor-search.directive.js';
import {specialtySelectDirectiveModule} from './specialty-select/specialty-select.directive.js';

// locals
import makeAppointmentModalTemplate from './make-appointment-modal.template.html';
import './make-appointment-modal.sass';

export let makeAppointmentModalDirectiveModule =
  angular
    .module('makeAppointmentModalDirectiveModule', [
      doctorSearchDirectiveModule.name,
      specialtySelectDirectiveModule.name,
    ])
    .directive('makeAppointmentModal', makeAppointmentModalDirective);

export function makeAppointmentModalDirective() {
  let shared = {};

  function controller () {
    _.extend(this, {
      type: '',
      string: '',
      getOptions: getOptions,
      api: {
        show: showModal
      },
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

  function getOptions(string, type) {
    console.log('finding possible appoinments');
  }

  return {
    restrict: 'E',
    scope: {
      api: '=name',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'modal',
    link: link,
    template: makeAppointmentModalTemplate,
  };
}
