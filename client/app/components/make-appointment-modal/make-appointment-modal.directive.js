/**
 * make appointment modal
 * <make-appointment-modal name="..."></make-appointment-modal>
 *
 * api: show()
 */

import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive.js';

// locals
import makeAppointmentModalTemplate from './make-appointment-modal.template.html';
import './make-appointment-modal.sass';

let partial =
  angular
    .module('makeAppointmentModalDirectiveModule', [
      // services
      require('../../services/makeAppointment.service'),

      // directives
      require('../make-appointment-doctor-search/make-appointment-doctor-search.directive'),
      require('../make-appointment-specialty-select/make-appointment-specialty-select.directive'),
      require('../make-appointment-select/make-appointment-select.directive'),
    ]);

export default partial.name;

partial.directive('makeAppointmentModal', makeAppointmentModalDirective);

function makeAppointmentModalDirective(MakeAppointment) {
  // this will be the same across the directive of this kind
  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    _.extend(my, {
      searchingMethod: null,
      possibleAppointments: [],
      type: null,
      doctorSearcher: null,
      specialtySelector: null,
      findingOptions: false,
      appointmentSelectorTitle: null,

      changeSearchingMethod: changeSearchingMethod,
      findOptions: findOptions,
      showModal: showModal,
      hideModal: hideModal,
      isSelected: isSelected,

      // intentiolly put here
      public: my,
    });

    function showModal() {
      my.element.children('.modal').openModal({
        dismissible: false,
      });
    }

    function hideModal() {
      my.element.children('.modal').closeModal();
    }

    function makeTitle(searchMethod, searchString) {
      let title = 'แสดงนัดหมาย';
      title +=
        (searchMethod === 'doctor') ?
          'ของ ' + searchString
          : 'จากแพทย์ที่มีความถนัดทาง ' + searchString;
      return title;
    }

    function isSelected() {
      if (my.searchingMethod === 'doctor') {
        return !!my.doctorSearcher.doctor;
      } else {
        return !!my.specialtySelector.specialty;
      }
    }

    function findOptions() {
      my.findingOptions = true;
      let promise = null;

      if (my.searchingMethod === 'doctor') {
        let doctor = my.doctorSearcher.doctor;
        promise = MakeAppointment.findOptionsByDoctor(doctor);
      } else if (my.searchingMethod === 'specialty') {
        let specialty = my.specialtySelector.specialty;
        promise = MakeAppointment.findOptionsBySpecialty(specialty);
      } else {
        throw new Error('no searchingMethod');
      }

      promise
        .then(
          (res) => {
            console.log('find options res:', res);

            my.findingOptions = false;
            my.possibleAppointments = res;

            hideModal();
            my.appointmentSelectorTitle =
              makeTitle(my.searchingMethod,
                (my.searchingMethod === 'doctor') ?
                  my.doctorSearcher.doctor.firstname + ' ' + my.doctorSearcher.doctor.lastname
                  : my.specialtySelector.specialty.val);
            my.appointmentSelector.showModal();
          });
    }

    function changeSearchingMethod(option) {
      console.log('changing seraching method:', option);
      if (option !== 'doctor'  && option !== 'specialty') {
        throw new Error('method is not right');
      }

      my.searchingMethod = option;
    }

  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);

    _.extend(my, {
      element: element,
      attrs: attrs,
    });

    // my.showModal();
  }

  return {
    restrict: 'E',
    scope: {
      public: '=name',
      onAppointmentMade: '&',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: makeAppointmentModalTemplate,
  };
}
