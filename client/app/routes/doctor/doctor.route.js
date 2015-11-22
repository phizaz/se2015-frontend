import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

// constants
import {doctorCalendarConstantModule} from '../../constants/doctorCalendar.constant'

// services
import {doctorTimeServiceModule} from '../../services/doctorTime.service';
import {doctorTimeEditingServiceModule} from '../../services/doctorTimeEditing.service'

// directives
import {doctorCalendarBodyDirectiveModule} from '../../components/doctor-calendar-body/doctor-calendar-body.directive';

// locals
import {DoctorController} from './doctor.controller';
import doctorTemplate from './doctor.template.html';
import './doctor.sass';

export let doctorRouteModule =
  angular.module('doctorRouteModule', [
    'ui.router',
    // constant
    doctorCalendarConstantModule.name,

    // serivces
    doctorTimeServiceModule.name,
    doctorTimeEditingServiceModule.name,

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
        controllerAs: 'my',
        resolve: {
          doctorTimeList: (DoctorTime, userInfo) => {
            return DoctorTime.getDoctorTimeList(userInfo);
          },
          doctorAppointmentList: (DoctorTime, userInfo) => {
            return DoctorTime.getDoctorAppointmentList(userInfo);
          },
        }
      });
  });
