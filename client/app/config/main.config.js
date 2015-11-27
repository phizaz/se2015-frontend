// This part should contains global configs
// Configures Providers. For example, $locationProvider.html5Mode(true);.

import angular from 'angular';
import 'angular-ui-router';

let partial = angular.module('mainConfigModule', [
  'ui.router',
  ]);

export let mainConfigModule = partial;

partial.config(function mainConfigModule($urlRouterProvider) {
    // set fallback url
    $urlRouterProvider.otherwise('/');
  });

partial.filter('range',
  () => {
    return (input, total) => {
      total = parseInt(total);

      for (var i=0; i<total; i++) {
        input.push(i);
      }

      return input;
    };
});

partial.filter('role',
  () => {
    let conversion = {
      Doctor: 'แพทย์',
      Staff: 'เจ้าหน้าที่',
      Nurse: 'พยาบาล',
      Pharmacist: 'เภสัชกร',
    };
    return (role) => {
      return conversion[role];
    };
  });

partial.filter('gender',
  () => {
    let conversion = {
      M: 'ชาย',
      F: 'หญิง',
    };
    return (gender) => {
      return conversion[gender];
    };
  });
