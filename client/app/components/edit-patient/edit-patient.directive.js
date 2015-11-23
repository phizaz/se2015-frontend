import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive.js';

import editPatientTemplate from './edit-patient.template.html';
import './edit-patient.sass';
import {showAppointmentDirectiveModule} from '../show-appointment/show-appointment.directive.js';
import {staffServiceModule} from '../../services/staff.service.js';
import {addPatientInfoModalDirectiveModule} from '../../components/add-patientInfo-modal/add-patientInfo-modal.directive.js';
export let editPatientDirectiveModule =
  angular
    .module('editPatientDirectiveModule', [
      showAppointmentDirectiveModule.name,
      staffServiceModule.name,
      addPatientInfoModalDirectiveModule.name,
      ])
    .directive('editPatient', editPatient);

export function editPatient(Staff) {
  let shared = {};

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;


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
      patient: '=',
      public: '=name'
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: editPatientTemplate,
  };
}
