import _ from 'lodash';
import moment from 'moment';

export class DoctorController {
  constructor(userInfo, doctorTimeList, doctorAppointmentList) {

    console.log('userInfo:', userInfo);

    _.extend(this, {
      doctorTimeList: doctorTimeList,
      doctorAppointmentList: doctorAppointmentList,
      currentWeek: moment(),
    });

  }

  goNextWeek() {
    console.log('going next week');
    this.currentWeek.add(1, 'w');
  }

  goPreviousWeek() {
    console.log('gonig previous week');
    this.currentWeek.subtract(1, 'w');
  }

  goPresentWeek() {
    console.log('going present week');
    this.currentWeek = moment();
  }

  goNextMonth() {
    console.log('gonig next month');
    this.currentWeek.add(1, 'month');
  }

  goPreviousMonth() {
    console.log('going previous month');
    this.currentWeek.subtract(1, 'month');
  }


}
