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

    let possibleAppointments = [
      { datetime: new Date("2016-10-10T14:48:00"),
        doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
      { datetime: new Date("2015-10-10T12:00:00"),
        doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
      { datetime: new Date(),
        doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
      { datetime: new Date(),
        doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
      { datetime: new Date(),
        doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
    ];
    let appointmentSelectCards = [];

    function showModal() {
      my.element.children('.modal').openModal();
    }

    function hideModal() {
      my.element.children('.modal').closeModal();
    }

    function select(cardInstance) {
      console.log('card:', cardInstance, 'is being selected');
      my.selectingCard = cardInstance;
      // deselect the rest
      for (let card of appointmentSelectCards) {
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
        .makeAppointment()
        .then(
          (res) => {
            console.log('summiting result:', res);
            my.submitting = false;
            // ...todo
            //
            // go some where
            // hide modal
            hideModal();
          });
    }

    _.extend(my, {
      selectingCard: null,
      submitting: false,
      possibleAppointments: possibleAppointments,
      appointmentSelectCards: appointmentSelectCards,

      show: showModal,
      hide: hideModal,
      select: select,
      deselect: deselect,
      submitAppointment: submitAppointment,

      // this is intensiontally placed here!
      // to make the whole be seen from the outside
      public: my
    });
  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;

    my.public.show();
  }

  return {
    restrict: 'E',
    scope: {
      public: '=name'
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: appointmentSelectTemplate,
  };
}
