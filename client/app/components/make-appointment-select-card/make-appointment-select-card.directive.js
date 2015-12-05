import angular from 'angular';
import _ from 'lodash';
import Directive from '../directive';

// locals
import appointmentSelectCardTemplate from './make-appointment-select-card.template.html';
import './make-appointment-select-card.sass';

const partial =
  angular
    .module('appointmentSelectCardDirectiveModule', [
      require('../../services/makeAppointment.service'),
    ]);

export default partial.name;

partial.directive('appointmentSelectCard', appointmentSelectCardDirective);

function appointmentSelectCardDirective(MakeAppointment) {
  // shared across every instance of the directive
  let shared = {};

  function controller($scope) {
    let my = Directive.constructor($scope, this);

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
    let my = Directive.getPrivate($scope);

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
