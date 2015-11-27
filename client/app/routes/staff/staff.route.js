import angular from 'angular';
import 'angular-ui-router';

// locals
import template from './staff.template.html';
import {StaffController} from './staff.controller.js';
import './staff.sass';

let partial =
  angular.module('staffRouteModule', [
    'ui.router',

    // services
    require('../../services/staff.service'),

    // directives
    require('../../components/patient-information/patient-information.directive'),
    require('../../components/doctor-information/doctor-information.directive'),
    require('../../components/show-appointment/show-appointment.directive'),
  ]);

export default partial.name;

partial.config(
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
          },
          unconfirmedStaffs: (Staff) => {
            return Staff.getUnconfirmedStaff();
          }
        }
      })
      // alias
      .state('staff', {
        controller: ($state) => $state.go('member.staff')
      });
  });
