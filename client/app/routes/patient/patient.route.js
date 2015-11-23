import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

// services
import {loginServiceModule} from '../../services/login.service';

// dircetive
import {makeAppointmentModalDirectiveModule} from '../../components/make-appointment-modal/make-appointment-modal.directive';

// locals
import {PatientController} from './patient.controller';
import patientTemplate from './patient.template.html';
import './patient.sass';

export let patientRouteModule =
  angular.module('patientRouteModule', [
    'ui.router',
    loginServiceModule.name,
    makeAppointmentModalDirectiveModule.name,
    ]);

patientRouteModule.config(
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
