import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

// services
import {loginServiceModule} from '../../services/login.service';

// routes
import {doctorRouteModule} from '../doctor/doctor.route';

// locals
import {MemberController} from './member.controller';
import memberTemplate from './member.template.html';
import './member.sass';

export let memberRouteModule =
  angular.module('memberRouteModule', [
    'ui.router',

    // services
    loginServiceModule.name,

    // routes
    doctorRouteModule.name,
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
          userInfo: (Login) => {
            return Login.userInfo();
          }
        }
      });
  });
