import angular from 'angular';
import _ from 'lodash';
import Directive from '../directive.js';

import patientInformationTemplate from './patient-information.template.html';
import './patient-information.sass';

const partial =
  angular
    .module('patientInformationDirectiveModule', [
      // directives
      require('../show-appointment/show-appointment.directive'),
    ]);

export default partial.name;

partial.directive('patientInformation', patientInformation);

function patientInformation() {
  let shared = {};

  function link($scope, element, attrs) {
    let my = Directive.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;

    my.element.find('.card2').hide();

    // my.public.show();
  }

  function controller($scope) {
    let my = Directive.constructor($scope, this);


    _.extend(my, {
      app: app,
      dis: dis,

      public: my,
    });

    function app() {
      console.log('app');
      my.element.find('.card2').show(800);
      my.element.find('.card3').hide(800);
    }
    function dis() {
      console.log('dis');
      my.element.find('.card2').hide(800);
      my.element.find('.card3').show(800);
    }

  }

  return {
    restrict: 'E',
    scope: {
      patient: '=',
      public: '=name'
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: patientInformationTemplate,
  };
}
