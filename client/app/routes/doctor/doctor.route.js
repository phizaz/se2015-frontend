import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

// services
import {navigatorServiceModule} from '../../services/navigator.service';

// locals
import {DoctorController} from './doctor.controller';
import doctorTemplate from './doctor.template.html';
import './doctor.sass';

export let doctorRouteModule =
  angular.module('doctorRouteModule', [
    'ui.router',
    navigatorServiceModule.name,
    ]);

doctorRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.doctor', {
        url: '/doctor',
        template: doctorTemplate,
        controller: DoctorController,
        controllerAs: 'doctor',
        resolve: {

        }
      });
  });
