import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

import { MemberController } from './member.controller';
import memberTemplate from './member.template.html';
import './member.sass';

const partial =
  angular.module('memberRouteModule', [
    'ui.router',

    // services
    require('../../services/login.service'),

    // directive
    require('../../components/greet/greet.directive'),

    // routes
    require('../doctor/doctor.route'),
    require('../staff/staff.route'),
    require('../nurse/nurse.route'),
  ]);

export default partial.name;

partial.config(
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
