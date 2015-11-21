import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive';

// locals
import template from './doctor-calendar-appointment.template.html';
import './doctor-calendar-appointment.sass';

export let doctorCalendarAppointmentDirectiveModule =
  angular
    .module('doctorCalendarAppointmentDirectiveModule', [])
    .directive('doctorCalendarAppointment', doctorCalendarAppointmentDirective);

export function doctorCalendarAppointmentDirective() {

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

    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: template,
  };

}
