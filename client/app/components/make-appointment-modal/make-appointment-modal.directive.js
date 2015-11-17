/**
 * make appointment modal
 * <make-appointment-modal name="..."></make-appointment-modal>
 *
 * api: show()
 */

import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive.js';

// services
import {makeAppointmentServiceModule} from '../../services/makeAppointment.service';

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
      makeAppointmentServiceModule.name,

      doctorSearchDirectiveModule.name,
      specialtySelectDirectiveModule.name,
      appointmentSelectDirectiveModule.name,
    ])
    .directive('makeAppointmentModal', makeAppointmentModalDirective);

export function makeAppointmentModalDirective(MakeAppointment) {
  // this will be the same across the directive of this kind
  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    function showModal() {
      my.element.children('.modal').openModal({
        dismissible: false,
      });
    }

    function hideModal() {
      my.element.children('.modal').closeModal();
    }

    function findOptions() {
      console.log('finding possible appoinments');
      console.log('doctorSearcher:', my.doctorSearcher);
      console.log('specialtySelector:', my.specialtySelector);

      // todo...
      my.findingOptions = true;
      MakeAppointment
        .findOptionsByDoctor()
        .then(
          (res) => {
            my.findingOptions = false;

            my.possibleAppointments = res;
            hideModal();
            my.appointmentSelector.showModal();
          });
    }

    _.extend(my, {
      possibleAppointments: [],
      type: null,
      doctorSearcher: null,
      specialtySelector: null,
      findingOptions: false,

      findOptions: findOptions,
      showModal: showModal,
      hideModal: hideModal,

      // intentiolly put here
      public: my,
    });
  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);

    _.extend(my, {
      element: element,
      attrs: attrs,
    });

    my.showModal();
  }

  return {
    restrict: 'E',
    scope: {
      public: '=name',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: makeAppointmentModalTemplate,
  };
}
