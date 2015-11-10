import angular from 'angular';
import 'angular-ui-router';

import {mainConfigModule} from './config/main.config.js';
import {navigatorRouteModule} from './routes/navigator/navigator.route.js';


export let mainModule = angular.module('mainModule', [
  'ui.router',
  mainConfigModule.name,

  // Routes
  // this should list all the routes that don't depend on others say parent routes
  navigatorRouteModule.name,
  ]);

mainModule.run(
  function mainModuleRun($rootScope) {
    console.log('the app is running');

    $rootScope.$on('$stateChangeSuccess',
      (event, toState, toParams, fromState, fromParams) => {
        console.group();
          console.info('$stateChangeSuccess');
          console.info('event', event);
          console.info('toState', toState);
          console.info('toParams', toParams);
          console.info('fromState', fromState);
          console.info('fromParams', fromParams);
        console.groupEnd();
      });

    $rootScope.$on('$stateChangeError',
      (event, toState, toParams, fromState, fromParams, error) => {
        console.group();
          console.error('$stateChangeError', error);
          console.error(error.stack);
          console.info('event', event);
          console.info('toState', toState);
          console.info('toParams', toParams);
          console.info('fromState', fromState);
          console.info('fromParams', fromParams);
        console.groupEnd();
      });
  });
