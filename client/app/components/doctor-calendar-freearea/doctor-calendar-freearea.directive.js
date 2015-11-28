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

partial.directive('doctorCalendarFreearea', (DOCTOR_CALENDAR) => {

  return Directive.new({

    controllerAs: 'my',
    template: template,

    interfaces: {
      startTime: '=',
      endTime: '=',
    },

    link($scope, element, attrs) {
      this.setSizeAndPos();
    },

    methods: {
      setSizeAndPos() {
        let startBlock =
          TimeBlockConverter.timeToBlock(DOCTOR_CALENDAR.beginHours, this.startTime);
        let endBlock =
          TimeBlockConverter.timeToBlock(DOCTOR_CALENDAR.beginHours, this.endTime);
        let blockHeight = DOCTOR_CALENDAR.blockHeight;
        let blockCount = endBlock - startBlock;

        let height = blockHeight * blockCount + 3 * DOCTOR_CALENDAR.blockPadding;
        // console.log('setHeight:', height, blockHeight, blockCount);
        this.element.css('height', height);

        // console.log('setTop:', blockHeight * startBlock);
        this.element.css('top', blockHeight * startBlock);
      }
    },

  });

});
