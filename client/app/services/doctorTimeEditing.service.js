import angular from 'angular';
import _ from 'lodash';
import {TimeBlockConverter} from '../helpers/timeBlockCoverter';

import {doctorCalendarConstantModule} from '../constants/doctorCalendar.constant';
import {doctorTimeServiceModule} from './doctorTime.service';

export class DoctorTimeEditing {

  constructor(DOCTOR_CALENDAR) {

    this.private = {};

    _.extend(this.private, {
      DOCTOR_CALENDAR: DOCTOR_CALENDAR,
    });

    _.extend(this, {

    });

  }

  makeEditingGridEach(doctorTimeList) {
    // todo
    let grid = [];

    for (let doctorTime of doctorTimeList) {
      let beginBlock =
        TimeBlockConverter.timeToBlock(
          this.private.DOCTOR_CALENDAR.beginHours,
          doctorTime.doctorTime_begin);
      let endBlock =
        TimeBlockConverter.timeToBlock(
          this.private.DOCTOR_CALENDAR.beginHours,
          doctorTime.doctorTime_end);
      let xSize = 1;
      let ySize = endBlock - beginBlock;
      let xPos = 0;
      let yPos = beginBlock;

      grid.push({
        sizeX: xSize,
        sizeY: ySize,
        row: yPos,
        col: xPos,
        doctorTime: doctorTime,
      });
    }

    return grid;
  }

  makeEditingGrid(doctorTimeListByDate) {

    let theGrid = {};
    for (let date of Object.keys(doctorTimeListByDate)) {
      let doctorTimeList = doctorTimeListByDate[date];

      theGrid[date] = this.makeEditingGridEach(doctorTimeList);
    }

    console.log('thegrid:', theGrid);
    return theGrid;
  }


}

export let doctorTimeEditingServiceModule =
  angular
    .module('doctorTimeEditingServiceModule', [
      doctorCalendarConstantModule.name,
      doctorTimeServiceModule.name,
      ])
    .service('DoctorTimeEditing', DoctorTimeEditing);
