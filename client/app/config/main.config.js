import angular from 'angular';
import 'angular-ui-router';

const partial =
  angular.module('mainConfigModule', [
    'ui.router',
  ]);

export default partial.name;

partial.config(
  ($urlRouterProvider) => {
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
      m: 'ชาย',
      f: 'หญิง',
    };
    return (gender) => {
      return conversion[gender];
    };
  });

partial.filter('nationality',
  () => {
    const conversion = {
      'thai': 'ไทย',
      'other_nation': 'อื่นๆ',
    };

    return (nationality) => {
      return conversion[nationality];
    };
  });

partial.filter('religion',
  () => {
    const conversion = {
      'buddha': 'พุทธ',
      'christ': 'คริสต์',
      'islam': 'อิสลาม',
      'other': 'อื่นๆ',
      '-': 'ไม่นับถือ',
    };

    return (religion) => {
      return conversion[religion];
    };
  });
