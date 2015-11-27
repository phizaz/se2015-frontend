import angular from 'angular';
import _ from 'lodash';
import Directive from '../directive';

// locals
import template from './doctor-calendar-appointment-modal.template.html';
import './doctor-calendar-appointment-modal.sass';

let partial =
  angular
    .module('doctorCalendarAppointmentModalDirectiveModule', [
      require('../doctor-drug-list/doctor-drug-list.directive'),
      require('../doctor-symtom-list/doctor-symtom-list.directive'),
      ]);

export default partial.name;

partial.directive('doctorCalendarAppointmentModal', doctorCalendarAppointmentModalDirective);

function doctorCalendarAppointmentModalDirective() {

  let shared = {};

  function controller($scope) {
    let my = Directive.constructor($scope, this);
    let patient = my.appointment.patient;
    let patientReport = my.appointment.patientReport;
    let drugInfo = my.appointment.drugInfo;
    let symtomInfo = my.appointment.symtomInfo;

    function patientToPharmacist() {

    }

    _.extend(my, {
      patient: patient,
      patientReport: patientReport,
      drugInfo: drugInfo,
      symtomInfo: symtomInfo,

      patientToPharmacist: patientToPharmacist,
      // this is intentionally put here
      public: my,
    });
  }

  function link($scope, element, attrs) {
    let my = Directive.getPrivate($scope);

    let $modal = element.find('.modal');

    function showModal() {
      $modal.openModal({
        dismissible: false,
      });
    }

    function closeModal() {
       $modal.closeModal();
    }

    // showModal();

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
      appointment: '=',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: template,
  };

}
