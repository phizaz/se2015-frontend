/**
 * appointment select
 * <appointment-select name="..."></appoinment-select>
 *
 *
 */

import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../../directive.js';

import appointmentSelectTemplate from './appointment-select.template.html';
import './appointment-select.sass';

export let appointmentSelectDirectiveModule =
  angular
    .module('appointmentSelectDirectiveModule', [])
    .directive('appointmentSelect', appointmentSelect);

export function appointmentSelect() {
  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    function showModal() {
      my.element.children('.modal').openModal();
    }

    _.extend(my, {
      public: {
        show: showModal
      }
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
    controllerAs: 'appointment',
    link: link,
    template: appointmentSelectTemplate,
  };
}
