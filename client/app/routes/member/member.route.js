import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

// routes
import {doctorRouteModule} from '../doctor/doctor.route';

// locals
import {MemberController} from './member.controller';
import memberTemplate from './member.template.html';
import './member.sass';

export let memberRouteModule =
  angular.module('memberRouteModule', [
    'ui.router',

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

        }
      });
  });
