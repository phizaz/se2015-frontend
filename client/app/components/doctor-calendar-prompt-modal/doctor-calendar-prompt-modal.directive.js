import angular from 'angular';
import _ from 'lodash';
import moment from 'moment';
import {DirectiveBlueprint} from '../directive';


// locals
import template from './doctor-calendar-prompt-modal.template.html';
import './doctor-calendar-prompt-modal.sass';

export let doctorCalendarPromptModalDirectiveModule =
  angular
    .module('doctorCalendarPromptModalDirectiveModule', [

      ])
    .directive('doctorCalendarPromptModal', doctorCalendarPromptModalDirective);

function doctorCalendarPromptModalDirective() {

  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    _.extend(my, {
      isDamage: false,
      days: [],
      momentDays: [],
      damages: [],
      loading: false,

      // function
      init: init,
      nextStep: nextStep,
      setLoading: setLoading,
      // this is intentionally put here
      public: my,
    });

    function nextStep() {
      my.submit();
    }

    function setLoading(val) {
      my.loading = val;
    }

    function init(damages) {
      console.log('damages:', damages);
      my.damages = damages || {};
      my.setLoading(false);

      for (let day of Object.keys(my.damages)) {
        if (my.damages[day].length > 0) {
          // days
          my.days.push(day);

          // momentDays
          my.momentDays.push(moment(day));

          // isDamage
          my.isDamage = true;
        }
      }

      console.log('isDamage:', my.isDamage);
      console.log('days:', my.days);

      my.showModal();
    }

  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);

    _.extend(my, {
      element: element,
      attrs: attrs,

      showModal: showModal,
      closeModal: closeModal,
    });

    function showModal() {
      element.find('.modal').openModal({
        dismissible: false,
      });
    }

    function closeModal() {
      console.log('closing modal..');
      element.find('.modal').closeModal();
    }
  }

  return {
    restrict: 'E',
    scope: {
      'public': '=name',
      'submit': '&',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: template,
  };

}
