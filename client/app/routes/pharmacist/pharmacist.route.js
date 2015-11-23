import angular from 'angular';
import 'angular-ui-router';

// services
import {pharmacistServiceModule} from '../../services/pharmacist.service.js';
import {staffServiceModule} from '../../services/staff.service';
// directives
import {greetDirectiveModule} from '../../components/greet/greet.directive.js';
import {patientInformationDirectiveModule} from '../../components/patient-information/patient-information.directive.js';
import {showAppointmentDirectiveModule} from '../../components/show-appointment/show-appointment.directive.js';
import {doctorInformationDirectiveModule} from '../../components/doctor-information/doctor-information.directive.js';
// locals
import pharmacistTemplate from './pharmacist.template.html';
import {PharmacistController} from './pharmacist.controller.js';
import './pharmacist.sass';
export let pharmacistRouteModule =
  angular.module('pharmacistRouteModule', [
    'ui.router',
    pharmacistServiceModule.name,
    staffServiceModule.name,
    greetDirectiveModule.name,
    patientInformationDirectiveModule.name,
    doctorInformationDirectiveModule.name,
    showAppointmentDirectiveModule.name
  ]);

pharmacistRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.pharmacist', {
        url: '/pharmacist',
        template: pharmacistTemplate,
        controller: PharmacistController,
        controllerAs: 'pharmacist',
        resolve: {
          isPharmacist: (Login) => {
              return Login.isPharmacist();
          }
        }
      });
  });
