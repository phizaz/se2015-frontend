import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../../../directive.js';

// services
import {makeAppointmentServiceModule} from '../../../../services/makeAppointment.service';

// locals
import appointmentSelectCardTemplate from './appointment-select-card.template.html';
import './appointment-select-card.sass';

export let appointmentSelectCardDirectiveModule =
  angular
    .module('appointmentSelectCardDirectiveModule', [
      makeAppointmentServiceModule.name,
      ])
    .directive('appointmentSelectCard', appointmentSelectCardDirective);

export function appointmentSelectCardDirective(MakeAppointment) {
  // shared across every instance of the directive
  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    function deselect() {
      my.selected = false;
    }

    function toggleSelect() {
      my.selecting = true;

      let promise = null;
      if (my.selected) {
        // unbook it
        promise = MakeAppointment.unbookAppointment();
      } else {
        // book it
        promise = MakeAppointment.bookAppointment();
      }

      promise.then(
        (res) => {
          my.selecting = false;
          my.selected = !my.selected;
          // tell the parent
          if (my.selected) {
            my.onSelect();
          } else {
            my.onDeselect();
          }
        });
    }

    _.extend(my, {
      selecting: false,
      selected: false,
      deselect: deselect,
      toggleSelect: toggleSelect,

      // though circular, but will expose the whole object to the outside world
      public: my,
    });
  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);

    _.extend(my, {
      element: element,
      attrs: attrs,
    });
  }

  return {
    restrict: 'E',
    template: appointmentSelectCardTemplate,
    link: link,
    controller: controller,
    controllerAs: 'my',
    bindToController: true,
    scope: {
      public: '=name',
      datetime: '=',
      doctor: '=',
      onSelect: '&',
      onDeselect: '&',
      disabled: '=',
    },
  };
}
