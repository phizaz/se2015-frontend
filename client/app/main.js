import angular from 'angular';
import 'angular-ui-router';

// nprogress
import NProgress from 'nprogress/nprogress.js';
import 'nprogress/nprogress.css';

// moment
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

import './main.sass';

let partial =
  angular
    .module('mainModule', [
      'ui.router',
      'ui.materialize',
      'angularMoment',

      // config
      require('./config/main.config'),

      // routes
      require('./routes/navigator/navigator.route'),
      require('./routes/member/member.route'),
      require('./routes/patient/patient.route'),
    ]);

export default partial.name;

partial.run(
  (amMoment) => {
    amMoment.changeLocale('th');
  });

partial.run(
  ($rootScope, $state) => {
    console.log('the app is running');

    $rootScope.$on('$stateChangeStart',
      (event, toState, toParams, fromState, fromParams) => {
        console.log('state change start');
        NProgress.start();
      });

    $rootScope.$on('$stateChangeSuccess',
      (event, toState, toParams, fromState, fromParams) => {
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
