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

    function select(cardInstance) {
      console.log('card:', cardInstance, 'is being selected');
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

    function submitAppointment() {
      let selectedCard = null;
      for (let card in appointmentSelectCards) {
        if (card.selecetd) {
          selectedCard = card;
          break;
        }
      }

      if (!selectedCard) {
        throw new Error('no selected card');
      }

      MakeAppointment
        .makeAppointment()
        .then(
          (res) => {
            // ...todo
          });
    }

    _.extend(my, {
      possibleAppointments: possibleAppointments,
      appointmentSelectCards: appointmentSelectCards,

      show: showModal,
      select: select,
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
