/**
 * make appointment modal
 * <make-appointment-modal name="..."></make-appointment-modal>
 *
 * api: show()
 */

import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive.js';

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
  // this will be the same across the directive of this kind
  let shared = {};

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;

    console.log('my:', my);

    // showModal();
  }

  function controller ($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    function showModal() {
      my.element.children('.modal').openModal();
    }

    function getOptions() {
      console.log('finding possible appoinments');
      console.log('doctorSearcher:', my.doctorSearcher);
      console.log('specialtySelector:', my.specialtySelector);

      // todo...
    }

    _.extend(my, {
      type: null,
      getOptions: getOptions,
      api: {
        show: showModal
      },
      doctorSearcher: null,
      specialtySelector: null,
    });
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
