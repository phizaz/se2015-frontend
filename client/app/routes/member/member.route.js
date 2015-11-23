import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

// services
import {loginServiceModule} from '../../services/login.service';

// directive
import {greetDirectiveModule} from '../../components/greet/greet.directive.js';

// routes
import {doctorRouteModule} from '../doctor/doctor.route';
import {staffRouteModule} from '../staff/staff.route';

// locals
import {MemberController} from './member.controller';
import memberTemplate from './member.template.html';
import './member.sass';

export let memberRouteModule =
  angular.module('memberRouteModule', [
    'ui.router',

    // services
    loginServiceModule.name,

    // directive
    greetDirectiveModule.name,

    // routes
    doctorRouteModule.name,
    staffRouteModule.name,
    ]);

memberRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('member', {
        abstract: true,
        template: memberTemplate,
        controller: MemberController,
        controllerAs: 'member',
        resolve: {
          isEmployee: (Login) => {
            return Login.isEmployee();
          },
          userInfo: (Login) => {
            return Login.userInfo();
          }
        }
      });
  });
