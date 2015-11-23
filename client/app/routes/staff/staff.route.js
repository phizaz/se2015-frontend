import angular from 'angular';
import 'angular-ui-router';

// services
import {staffServiceModule} from '../../services/staff.service.js';

// directives
import {patientInformationDirectiveModule} from '../../components/patient-information/patient-information.directive.js';
import {showAppointmentDirectiveModule} from '../../components/show-appointment/show-appointment.directive.js';
import {doctorInformationDirectiveModule} from '../../components/doctor-information/doctor-information.directive.js';

// locals
import template from './staff.template.html';
import {StaffController} from './staff.controller.js';
import './staff.sass';

export let staffRouteModule =
  angular.module('staffRouteModule', [
    'ui.router',
    staffServiceModule.name,
    patientInformationDirectiveModule.name,
    doctorInformationDirectiveModule.name,
    showAppointmentDirectiveModule.name
  ]);

staffRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('member.staff', {
        url: '/staff',
        template: template,
        controller: StaffController,
        controllerAs: 'staff',
        resolve: {
          isStaff: (Login) => {
              return Login.isStaff();
          }
        }
      })
      // alias
      .state('staff', {
        controller: ($state) => $state.go('member.staff')
      });
  });
