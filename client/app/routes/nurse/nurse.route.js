import angular from 'angular';
import 'angular-ui-router';

// services
import {nurseServiceModule} from '../../services/nurse.service.js';
// directives
import {greetDirectiveModule} from '../../components/greet/greet.directive.js';
import {patientInformationDirectiveModule} from '../../components/patient-information/patient-information.directive.js';
// locals
import nurseTemplate from './nurse.template.html';
import {NurseController} from './nurse.controller.js';
import './nurse.sass';
export let nurseRouteModule =
  angular.module('nurseRouteModule', [
    'ui.router',
    nurseServiceModule.name,
    greetDirectiveModule.name,
    patientInformationDirectiveModule.name,
  ]);

nurseRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.nurse', {
        url: '/nurse',
        template: nurseTemplate,
        controller: NurseController,
        controllerAs: 'nurse',
        resolve: {
          isNurse: (Login) => {
              return Login.isNurse();
          }
        }
      });
  });
