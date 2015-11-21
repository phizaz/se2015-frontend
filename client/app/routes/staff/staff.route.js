import angular from 'angular';
import 'angular-ui-router';

// services
import {staffServiceModule} from '../../services/staff.service.js';
// directives
import {greetDirectiveModule} from '../../components/greet/greet.directive.js';
import {patientInformationDirectiveModule} from '../../components/patient-information/patient-information.directive.js';
import {showAppointmentDirectiveModule} from '../../components/show-appointment/show-appointment.directive.js';
import {doctorInformationDirectiveModule} from '../../components/doctor-information/doctor-information.directive.js';
// locals
import staffTemplate from './staff.template.html';
import {StaffController} from './staff.controller.js';
import './staff.sass';
export let staffRouteModule =
  angular.module('staffRouteModule', [
    'ui.router',
    staffServiceModule.name,
    greetDirectiveModule.name,
    patientInformationDirectiveModule.name,
    doctorInformationDirectiveModule.name,
    showAppointmentDirectiveModule.name
  ]);

staffRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.staff', {
        url: '/staff',
        template: staffTemplate,
        controller: StaffController,
        controllerAs: 'staff',
        resolve: {

        }
      });
  });
