import angular from 'angular';
import 'angular-ui-router';

// services
import {pharmarcistServiceModule} from '../../services/pharmarcist.service.js';
// directives
import {greetDirectiveModule} from '../../components/greet/greet.directive.js';
import {patientInformationDirectiveModule} from '../../components/patient-information/patient-information.directive.js';
import {showAppointmentDirectiveModule} from '../../components/show-appointment/show-appointment.directive.js';
import {doctorInformationDirectiveModule} from '../../components/doctor-information/doctor-information.directive.js';
// locals
import pharmarcistTemplate from './pharmarcist.template.html';
import {pharmarcistController} from './pharmarcist.controller.js';
import './pharmarcist.sass';
export let pharmarcistRouteModule =
  angular.module('pharmarcistRouteModule', [
    'ui.router',
    pharmarcistServiceModule.name,
    greetDirectiveModule.name,
    patientInformationDirectiveModule.name,
    doctorInformationDirectiveModule.name,
    showAppointmentDirectiveModule.name
  ]);

pharmarcistRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.pharmarcist', {
        url: '/pharmarcist',
        template: pharmarcistTemplate,
        controller: pharmarcistController,
        controllerAs: 'pharmarcist',
        resolve: {
          isPharmarcist: (Login) => {
              return Login.isPharmarcist();
          }
        }
      });
  });
