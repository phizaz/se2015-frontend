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
import {appointmentSelectDirectiveModule} from './appointment-select/appointment-select.directive.js';

// locals
import makeAppointmentModalTemplate from './make-appointment-modal.template.html';
import './make-appointment-modal.sass';

export let makeAppointmentModalDirectiveModule =
  angular
    .module('makeAppointmentModalDirectiveModule', [
      doctorSearchDirectiveModule.name,
      specialtySelectDirectiveModule.name,
      appointmentSelectDirectiveModule.name,
    ])
    .directive('makeAppointmentModal', makeAppointmentModalDirective);

export function makeAppointmentModalDirective() {
  let shared;

  function controller () {
    shared = this;

    _.extend(shared, {
      type: null,
      getOptions: getOptions,
      api: {
        show: showModal
      },
      doctorSearcher: null,
      specialtySelector: null,
    });
  }

  function link($scope, element, attrs) {
    shared.element = element;
    shared.attrs = attrs;

    // showModal();
  }

  function showModal() {
    shared.element.children('.modal').openModal();
  }

  function getOptions() {
    console.log('finding possible appoinments');
    console.log('doctorSearcher:', shared.doctorSearcher);
    console.log('specialtySelector:', shared.specialtySelector);

    // todo...
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
