import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

// services
import {doctorTimeServiceModule} from '../../services/doctorTime.service';

// directives
import {doctorCalendarBodyDirectiveModule} from '../../components/doctor-calendar-body/doctor-calendar-body.directive';

// locals
import {DoctorController} from './doctor.controller';
import doctorTemplate from './doctor.template.html';
import './doctor.sass';

export let doctorRouteModule =
  angular.module('doctorRouteModule', [
    'ui.router',

    // serivces
    doctorTimeServiceModule.name,

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
          doctorTimeList: (DoctorTime, userInfo) => {
            return DoctorTime.getDoctorTimeList(userInfo);
          }
        }
      });
  });
