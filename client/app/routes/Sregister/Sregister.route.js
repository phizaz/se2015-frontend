import angular from 'angular';
import 'angular-ui-router';
import "./Sregister.sass";
import SRegisterTemplate from './Sregister.template.html';
import {SRegisterController} from './Sregister.controller';
import {SregisterServiceModule} from '../../services/Sregister.service.js';

export let SRegisterRouteModule =
  angular.module('SRegisterRouteModule', [
    'ui.router',
    SregisterServiceModule.name
  ]);

SRegisterRouteModule.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.SRegister', {
        url: '/SRegister',
        template: SRegisterTemplate,
        controller: SRegisterController,
        controllerAs: 'Sregister',
      });
  });
