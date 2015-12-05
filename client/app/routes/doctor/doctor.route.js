import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

import {DoctorController} from './doctor.controller';
import doctorTemplate from './doctor.template.html';
import './doctor.sass';

const partial =
  angular.module('doctorRouteModule', [
    'ui.router',
    // constant
    require('../../constants/doctorCalendar.constant'),

    // serivces
    require('../../services/doctorTime.service'),
    require('../../services/doctorTimeEditing.service'),

    // directives
    require('../../components/doctor-calendar-body/doctor-calendar-body.directive'),
    require('../../components/doctor-calendar-prompt-modal/doctor-calendar-prompt-modal.directive'),
    ]);

export default partial.name;

partial.config(
  ($stateProvider) => {
    $stateProvider
      .state('member.doctor', {
        url: '/doctor',
        template: doctorTemplate,
        controller: DoctorController,
        controllerAs: 'my',
        resolve: {
          doctorTimeList: (DoctorTime, userInfo) => {
            return DoctorTime.getDoctorTimeList(userInfo);
          },
          doctorAppointmentList: (DoctorTime, userInfo) => {
            return DoctorTime.getDoctorAppointmentList(userInfo);
          },
        }
      })
      // alias
      .state('doctor', {
        controller: ($state) => $state.go('member.doctor')
      });
  });
