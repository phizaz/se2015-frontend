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

function doctorInformation() {
  let shared = {};

  function link($scope, element, attrs) {

    console.log('scope:', $scope);

    let my = DirectiveBlueprint.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;

    my.element.find('.card2').hide();

    // my.public.show();
  }

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    _.extend(my, {
      appear: appear,
      disappear: disappear,

      public: my,
    });

    console.log('doctor information my:', my);

    function appear() {
      console.log('appear');
      my.element.find('.card2').show(800);
      my.element.find('.card3').hide(800);
    }
    function disappear() {
      console.log('disappear');
      my.element.find('.card2').hide(800);
      my.element.find('.card3').show(800);
    }
  }

  return {
    restrict: 'E',
    scope: {
      public: '=name',
      staff: '=',
      parent: '=',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: doctorInformationTemplate,
  };
}
