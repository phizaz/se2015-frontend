import angular from 'angular';
import 'angular-ui-router';

// locals
import homeTemplate from './home.template.html';
import './home.sass';
import {HomeController} from './home.controller.js';

let partial =
  angular.module('homeRouteModule', [
    'ui.router',

    // directives
    require('../../components/login-modal/login-modal.directive'),
    require('../../components/make-appointment-modal/make-appointment-modal.directive'),
    require('../../components/edit-patient/edit-patient.directive'),
  ]);

export default partial.name;

partial.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.home', {
        url: '/',
        template: homeTemplate,
        controller: HomeController,
        controllerAs: 'home',
        resolve: {
        }
      })
      .state('home', {
        controller: ($state) => $state.go('navigator.home')
      });
  });
