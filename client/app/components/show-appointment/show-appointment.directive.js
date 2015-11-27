import angular from 'angular';
import _ from 'lodash';
import moment from 'moment';
import Directive from '../directive.js';

import showAppointmentTemplate from './show-appointment.template.html';
import './show-appointment.sass';

let partial =
  angular
    .module('showAppointmentDirectiveModule', []);

export default partial.name;

partial.directive('showAppointment', showAppointment);

function showAppointment() {
  let shared = {};

  function link($scope, element, attrs) {
    let my = Directive.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;
    my.element.find('.card3').hide();

    // my.public.show();
  }
  function controller($scope) {
    let my = Directive.constructor($scope, this);

    _.extend(my, {
      timetime: moment(my.appointment.time),
      name: my.appointment.doctor_name,
      public: my,
    });
  }

  return {
    restrict: 'E',
    scope: {
      appointment: '=',
      public: '=name'
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: showAppointmentTemplate,
  };
}
