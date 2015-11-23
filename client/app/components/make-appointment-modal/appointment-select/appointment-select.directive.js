/**
 * appointment select
 * <appointment-select name="..."></appoinment-select>
 *
 *
 */

import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../../directive.js';

// services
import {makeAppointmentServiceModule} from '../../../services/makeAppointment.service';

// directives
import {appointmentSelectCardDirectiveModule} from './appointment-select-card/appointment-select-card.directive.js';

// locals
import appointmentSelectTemplate from './appointment-select.template.html';
import './appointment-select.sass';

export let appointmentSelectDirectiveModule =
  angular
    .module('appointmentSelectDirectiveModule', [
      makeAppointmentServiceModule.name,
      appointmentSelectCardDirectiveModule.name,
      ])
    .directive('appointmentSelect', appointmentSelect);

export function appointmentSelect(MakeAppointment) {
  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    _.extend(my, {
      selectingCard: null,
      submitting: false,
      appointmentCreated: false,
      appointmentSelectCards: [],

      back: back,
      showModal: showModal,
      hideModal: hideModal,
      select: select,
      deselect: deselect,
      submitAppointment: submitAppointment,
      nextStep: nextStep,

      // this is intensiontally placed here!
      // to make the whole be seen from the outside
      public: my
    });

    // mock();
    // function mock() {
    //   let possibleAppointments = [
    //       { datetime: new Date("2016-10-10T14:48:00"),
    //         doctor: {
    //           firstname: 'นพ. กรพัฒน์',
    //           lastname: 'ปรีชากุล',
    //           emp_id: 1
    //         }
    //       },
    //       { datetime: new Date("2015-10-10T12:00:00"),
    //         doctor: {
    //           firstname: 'นพ. กรพัฒน์',
    //           lastname: 'ปรีชากุล',
    //           emp_id: 1
    //         }
    //       },
    //       { datetime: new Date(),
    //         doctor: {
    //           firstname: 'นพ. กรพัฒน์',
    //           lastname: 'ปรีชากุล',
    //           emp_id: 1
    //         }
    //       },
    //       { datetime: new Date(),
    //         doctor: {
    //           firstname: 'นพ. กรพัฒน์',
    //           lastname: 'ปรีชากุล',
    //           emp_id: 1
    //         }
    //       },
    //       { datetime: new Date(),
    //         doctor: {
    //           firstname: 'นพ. กรพัฒน์',
    //           lastname: 'ปรีชากุล',
    //           emp_id: 1
    //         }
    //       },
    //     ];
    //   my.possibleAppointments = possibleAppointments;
    // }

    function back() {
      hideModal();
      my.onBack();
    }

    function nextStep() {
      // hide modal
      hideModal();
      my.onAppointmentMade();
    }

    function showModal() {
      my.element.children('.modal').openModal({
        dismissible: false,
      });
    }

    function hideModal() {
      my.element.children('.modal').closeModal();
    }

    function select(cardInstance) {
      console.log('card:', cardInstance, 'is being selected');
      my.selectingCard = cardInstance;
      // deselect the rest
      for (let card of my.appointmentSelectCards) {
        if (card === cardInstance) {
          continue;
        }

        if (card.selected) {
          card.deselect();
        }
      }
    }

    function deselect() {
      my.selectingCard = null;
    }

    function submitAppointment() {
      if (!my.selectingCard) {
        throw new Error('no selected card');
      }

      my.submitting = true;
      MakeAppointment
        .submitAppointment(my.selectingCard.doctor, my.selectingCard.datetime)
        .then(
          (res) => {
            console.log('summiting result:', res);
            my.submitting = false;
            my.appointmentCreated = true;
          })
        .catch(
          (messages) => {
            console.log(messages);
            throw new Error('submittingAppointment');
          });
    }

  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;

    // my.showModal();
  }

  return {
    restrict: 'E',
    scope: {
      public: '=name',
      title: '=',
      possibleAppointments: '=',
      onBack: '&',
      onAppointmentMade: '&',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: appointmentSelectTemplate,
  };
}
