import angular from 'angular';
import 'angular-ui-router';

// locals
import template from './staff.template.html';
import { StaffController } from './staff.controller.js';
import './staff.sass';

const partial =
  angular.module('staffRouteModule', [
    'ui.router',

    // directives
    require('../../components/patient-information/patient-information.directive'),
    require('../../components/doctor-information/doctor-information.directive'),
    require('../../components/show-appointment/show-appointment.directive'),
    require('../../components/make-appointment-modal/make-appointment-modal.directive'),
    require('../../components/delete-appointment-modal/delete-appointment-modal.directive'),
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
        },
      })
      // alias
      .state('staff', {
        controller: ($state) => $state.go('member.staff'),
      });
  });
