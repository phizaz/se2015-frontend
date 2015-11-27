import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

import {PatientController} from './patient.controller';
import patientTemplate from './patient.template.html';
import './patient.sass';

let partial =
  angular.module('patientRouteModule', [
    'ui.router',

    // services
    require('../../services/login.service'),

    // directives
    require('../../components/make-appointment-modal/make-appointment-modal.directive'),
  ]);

export default partial.name;

partial.config(
  ($stateProvider) => {
    $stateProvider
      .state('patient', {
        url: '/patient',
        template: patientTemplate,
        controller: PatientController,
        controllerAs: 'my',
        resolve: {
          userInfo: (Login) => {
            return Login.userInfo();
          },

          isPatient: (Login) => {
            return Login.isPatient();
          }
        }
      });
  });
