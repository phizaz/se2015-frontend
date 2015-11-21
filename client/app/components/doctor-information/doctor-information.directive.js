import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive.js';

import doctorInformationTemplate from './doctor-information.template.html';
import './doctor-information.sass';
import {showAppointmentDirectiveModule} from '../show-appointment/show-appointment.directive.js';
export let doctorInformationDirectiveModule =
  angular
    .module('doctorInformationDirectiveModule', [
      showAppointmentDirectiveModule.name
      ])
    .directive('doctorInformation', doctorInformation);

export function doctorInformation() {
  let shared = {};

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;

    my.element.find('.card2').hide();

    // my.public.show();
  }

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);
    _.extend(my, {
      app: app,
      dis: dis,

      public: my,
    });
    function app() {
      console.log('app');
      my.element.find('.card2').show(800);
      my.element.find('.card3').hide(800);
    }
    function dis() {
      console.log('dis');
      my.element.find('.card2').hide(800);
      my.element.find('.card3').show(800);
    }
  
  }

  return {
    restrict: 'E',
    scope: {
      public: '=name'
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'doctorInformation',
    link: link,
    template: doctorInformationTemplate,
  };
}
