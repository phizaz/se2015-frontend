import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive';

// directives
import {doctorDrugListDirectiveModule} from '../doctor-drug-list/doctor-drug-list.directive';
import {doctorSymtomListDirectiveModule} from '../doctor-symtom-list/doctor-symtom-list.directive';

// locals
import template from './doctor-calendar-appointment-modal.template.html';
import './doctor-calendar-appointment-modal.sass';

export let doctorCalendarAppointmentModalDirectiveModule =
  angular
    .module('doctorCalendarAppointmentModalDirectiveModule', [
      doctorDrugListDirectiveModule.name,
      doctorSymtomListDirectiveModule.name,
      ])
    .directive('doctorCalendarAppointmentModal', doctorCalendarAppointmentModalDirective);

export function doctorCalendarAppointmentModalDirective() {

  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    _.extend(my, {

      // this is intentionally put here
      public: my,
    });
  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);

    let $modal = element.find('.modal');

    function showModal() {
      $modal.openModal({
        dismissible: false,
      });
    }

    function closeModal() {
       $modal.closeModal();
    }

    _.extend(my, {
      element: element,
      attrs: attrs,
      $modal: $modal,

      showModal: showModal,
      closeModal: closeModal,
    });
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
    template: template,
  };

}
