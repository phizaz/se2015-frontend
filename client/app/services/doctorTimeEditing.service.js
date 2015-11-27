import angular from 'angular';
import _ from 'lodash';
import {TimeBlockConverter} from '../helpers/timeBlockCoverter';

let partial =
  angular
    .module('doctorTimeEditingServiceModule', [
      require('../constants/doctorCalendar.constant'),
      require('./doctorTime.service'),
    ]);

export default partial.name;

partial.service('DoctorTimeEditing', (DOCTOR_CALENDAR) => {

  class DoctorTimeEditing {

    constructor() {

      this.private = {};

      _.extend(this.private, {
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
            DOCTOR_CALENDAR.beginHours,
            doctorTime.doctorTime_begin);
        let endBlock =
          TimeBlockConverter.timeToBlock(
            DOCTOR_CALENDAR.beginHours,
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

    calculateDamage(appointmentList, editingGrid) {
      appointmentList = appointmentList || [];
      editingGrid = editingGrid || [];

      let coverage = [];
      for (let i = 0; i < DOCTOR_CALENDAR.blockCounts; ++i) {
        coverage.push(0);
      }

      for (let each of editingGrid) {
        let begin = each.row;
        let end = each.row + each.sizeY - 1;

        for (let i = begin; i <= end; ++i) {
          coverage[i] = 1;
        }
      }

      let damages = [];
      for (let appointment of appointmentList) {
        let block =
          TimeBlockConverter.timeToBlock(
            DOCTOR_CALENDAR.beginHours, appointment.time);
        if (coverage[block] === 0) {
          damages.push(appointment);
        }
      }

      console.log('damages:', damages);

      return damages;
    }

    calculateChange(doctorTimeList, editingGrid, today) {
      doctorTimeList = doctorTimeList || [];
      editingGrid = editingGrid || [];

      let deletions = [];
      let creations = [];

      let timeline = [];
      for (let i = 0; i < DOCTOR_CALENDAR.blockCounts + 1; ++i) {
        timeline.push(0);
      }

      // console.log('timeline:', timeline, timeline.length);
      // mark timeline such that 1 denotes that it is being used
      for (let each of editingGrid) {
        let begin = each.row;
        let end = each.row + each.sizeY - 1;

        for (let i = begin; i <= end; ++i) {
          timeline[i] = 1;
        }
      }

      // console.log('timeline after:', timeline);

      function blockToTime(block) {
        let time =
          TimeBlockConverter.blockToTime(
            DOCTOR_CALENDAR.beginHours, block);

        let todayDate = {
          date: today.date(),
          month: today.month(),
          year: today.year(),
        };
        return time.set(todayDate).format();
      }

      // create connected components
      let connectedBegin = null;
      let connectedSize = 0;
      let before = null;
      for (let i = 0; i < timeline.length; ++i) {

        if (timeline[i] !== before) {
          if (timeline[i] === 1) {
            connectedBegin = i;
          }
          else {
            if (connectedSize > 0) {
              creations.push({
                start: blockToTime(connectedBegin),
                end: blockToTime(connectedBegin + connectedSize)
                });
            }

            connectedBegin = null;
          }

          connectedSize = 0;
        }

        if (timeline[i] === 1) {
          connectedSize += 1;
        }

        before = timeline[i];
      }

      // create deletions list
      for (let each of doctorTimeList) {
        deletions.push(each.doctorTime_id);
      }

      return [deletions, creations];
    }
  }

  return new DoctorTimeEditing();

});
