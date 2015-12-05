import angular from 'angular';
import 'angular-ui-router';
import 'angular-messages';

import { RegisterController } from './register.controller';
import registerTemplate from './register.template.html';
import './register.sass';

const partial =
  angular.module('registerRouteModule', [
    'ui.router',
    'ngMessages',
    require('../../services/register.service'),
    require('../../components/login-modal/login-modal.directive')
  ]);

export default partial.name;

partial.config(
  ($stateProvider) => {
    $stateProvider
      .state('navigator.register', {
        url: '/register',
        template: registerTemplate,
        controller: RegisterController,
        controllerAs: 'register',
        resolve: {
          redirectToHisOwnPage: (Login) => {
            return new Promise(
              (resolve, reject) => {
                Login.toHisOwnPage()
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => {
                    console.log('redirect:', err);
                    if (err.redirect === 'staff') {
                      // let staff to get in the register page
                      resolve();
                    }
                    else {
                      reject(err);
                    }
                  });
              });
          }
        }
      })
      // alias
      .state('register', {
        controller: ($state) => $state.go('navigator.register')
      });
  });
