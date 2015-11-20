import _ from 'lodash';
import moment from 'moment';

export class DoctorController {
  constructor(userInfo, doctorTimeList) {

    console.log('userInfo:', userInfo);

    _.extend(this, {
      doctorTimeList: doctorTimeList,
      currentWeek: moment(),
    });

  }

  goNextWeek() {
    this.currentWeek = this.currentWeek.add(1, 'w');
  }

  goPreviousWeek() {
    this.currentWeek = this.currentWeek.substract(1, 'w');
  }

  goPresentWeek() {
    this.currentWeek = moment();
  }

  goNextMonth() {
    this.currentWeek = this.currentWeek.add(1, 'm');
  }

  goPreviousMonth() {
    this.currentWeek = this.currentWeek.substract(1, 'm');
  }


}
