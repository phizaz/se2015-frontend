import angular from 'angular';
import _ from 'lodash';
import Directive from '../directive';
import TimeBlockConverter from '../../helpers/timeBlockCoverter';

import template from './doctor-calendar-freearea.template.html';
import './doctor-calendar-freearea.sass';

let partial =
  angular
    .module('doctorCalendarFreeareaDirectiveModule', [
      // constant
      require('../../constants/doctorCalendar.constant')
    ]);

export default partial.name;

partial.directive('doctorCalendarFreearea', doctorCalendarFreeareaDirective);

function doctorCalendarFreeareaDirective(DOCTOR_CALENDAR) {

  let shared = {};

  function controller($scope) {
    let my = Directive.constructor($scope, this);

    _.extend(my, {

      // this is intentionally put here
      public: my,
    });
  }

  function link($scope, element, attrs) {
    let my = Directive.getPrivate($scope);

    function setSizeAndPos() {
      let startBlock =
        TimeBlockConverter.timeToBlock(DOCTOR_CALENDAR.beginHours, my.startTime);
      let endBlock =
        TimeBlockConverter.timeToBlock(DOCTOR_CALENDAR.beginHours, my.endTime);
      let blockHeight = DOCTOR_CALENDAR.blockHeight;
      let blockCount = endBlock - startBlock;

      let height = blockHeight * blockCount + 3 * DOCTOR_CALENDAR.blockPadding;
      // console.log('setHeight:', height, blockHeight, blockCount);
      element.css('height', height);

      // console.log('setTop:', blockHeight * startBlock);
      element.css('top', blockHeight * startBlock);
    }

    setSizeAndPos();

    _.extend(my, {
      element: element,
      attrs: attrs,

      setSizeAndPos: setSizeAndPos,
    });
  }

  return {
    restrict: 'E',
    scope: {
      startTime: '=',
      endTime: '=',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: template,
  };

}
