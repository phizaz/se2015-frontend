import angular from 'angular';
import 'angular-ui-router';

// locals
import { NurseController } from './nurse.controller.js';
import nurseTemplate from './nurse.template.html';
import './nurse.sass';

const partial =
  angular.module('nurseRouteModule', [
    'ui.router',

    // services
    require('../../redux/store'),
  ]);

export default partial.name;

partial.config(
  ($stateProvider) => {
    $stateProvider
      .state('member.nurse', {
        url: '/nurse',
        template: nurseTemplate,
        controller: NurseController,
        controllerAs: 'my',
        resolve: {
          isNurse: (Login) => {
            return Login.isNurse();
          }
        }
      })
      // alias
      .state('nurse', {
        controller($state) {
          $state.go('member.nurse');
        }
      });
  });
