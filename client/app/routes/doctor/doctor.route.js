import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

// angular gridster
import 'javascript-detect-element-resize/jquery.resize.js';
import 'angular-gridster/dist/angular-gridster.min.js';
import 'angular-gridster/dist/angular-gridster.min.css';

// services
import {navigatorServiceModule} from '../../services/navigator.service';

// locals
import {DoctorController} from './doctor.controller';
import doctorTemplate from './doctor.template.html';
import './doctor.sass';

export let doctorRouteModule =
  angular.module('doctorRouteModule', [
    'ui.router',
    'gridster',
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
