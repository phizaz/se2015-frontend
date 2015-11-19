import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

// angular gridster
import 'javascript-detect-element-resize/jquery.resize.js';
import 'angular-gridster/dist/angular-gridster.min.js';
import 'angular-gridster/dist/angular-gridster.min.css';

// directives
import {doctorCalendarBodyDirectiveModule} from '../../components/doctor-calendar-body/doctor-calendar-body.directive';

// locals
import {DoctorController} from './doctor.controller';
import doctorTemplate from './doctor.template.html';
import './doctor.sass';

export let doctorRouteModule =
  angular.module('doctorRouteModule', [
    'ui.router',
    'gridster',

    // directives
    doctorCalendarBodyDirectiveModule.name,
    ]);

doctorRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('member.doctor', {
        url: '/doctor',
        template: doctorTemplate,
        controller: DoctorController,
        controllerAs: 'doctor',
        resolve: {

        }
      });
  });
