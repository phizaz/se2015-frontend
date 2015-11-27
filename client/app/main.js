import angular from 'angular';
import 'angular-ui-router';
import 'flux-angular';

// nprogress
import NProgress from 'nprogress/nprogress.js';
import 'nprogress/nprogress.css';

// moment
// angular-moment will include things automatically
import 'angular-moment';

// materialize
import 'Materialize/dist/css/materialize.css';
import 'Materialize/dist/js/materialize.js';
import 'angular-materialize/src/angular-materialize.js';


// font-awesome
import 'font-awesome/css/font-awesome.css';

// quark
import './fonts/quark/stylesheet.css';

// animate-css
import 'animate.css';

// routes
import {navigatorRouteModule} from './routes/navigator/navigator.route.js';
import {memberRouteModule} from './routes/member/member.route';
import {patientRouteModule} from './routes/patient/patient.route';

// locals
import {mainConfigModule} from './config/main.config.js';
import './main.sass';

export let mainModule = angular.module('mainModule', [
  'flux',
  'ui.router',
  'ui.materialize',
  'angularMoment',
  mainConfigModule.name,

  // Routes
  // this should list all the routes that don't depend on others say parent routes
  navigatorRouteModule.name,
  memberRouteModule.name,
  patientRouteModule.name,
  ]);

mainModule.run(
  (amMoment) => {
    amMoment.changeLocale('th');
  });

mainModule.run(
  ($rootScope, $state) => {
    console.log('the app is running');

    $rootScope.$on('$stateChangeStart',
      (event, toState, toParams, fromState, fromParams) => {
        console.log('state change start');
        NProgress.start();
      });

    $rootScope.$on('$stateChangeSuccess',
      (event, toState, toParams, fromState, fromParams) => {
        // console.group();
        //   console.info('$stateChangeSuccess');
        //   console.info('event', event);
        //   console.info('toState', toState);
        //   console.info('toParams', toParams);
        //   console.info('fromState', fromState);
        //   console.info('fromParams', fromParams);
        // console.groupEnd();

        NProgress.done();
      });

    $rootScope.$on('$stateChangeError',
      (event, toState, toParams, fromState, fromParams, error) => {
        console.group();
          console.log('$stateChangeError', error);
          console.log(error.stack);
          console.info('event', event);
          console.info('toState', toState);
          console.info('toParams', toParams);
          console.info('fromState', fromState);
          console.info('fromParams', fromParams);
        console.groupEnd();

        // redirect to the desired target
        if (error.redirect) {
          $state.go(error.redirect);
        }
      });
  });
