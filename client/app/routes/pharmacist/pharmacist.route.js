import angular from 'angular';
import 'angular-ui-router';

// locals
import pharmacistTemplate from './pharmacist.template.html';
import { PharmacistController } from './pharmacist.controller.js';
import './pharmacist.sass';

const partial =
  angular.module('pharmacistRouteModule', [
    'ui.router',

    // services
    require('../../redux/store'),
  ]);

export default partial.name;

partial.config(
  ($stateProvider) => {
    $stateProvider
      .state('member.pharmacist', {
        url: '/pharmacist',
        template: pharmacistTemplate,
        controller: PharmacistController,
        controllerAs: 'my',
        resolve: {
          isPharmacist: (Login) => {
            return Login.isPharmacist();
          }
        }
      })
      // alias
      .state('pharmacist', {
        controller($state) {
          $state.go('member.pharmacist');
        }
      });
  });
