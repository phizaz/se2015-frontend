import _ from 'lodash';
import moment from 'moment';

export class DoctorController {
  constructor(DoctorTime, DoctorTimeEditing, userInfo, doctorTimeList, doctorAppointmentList) {

    console.log('userInfo:', userInfo);

    // for development
    setTimeout(
      () => this.startEditingDoctorTime(), 100);

    _.extend(this, {
      editingMode: false,
      DoctorTime: DoctorTime,
      DoctorTimeEditing: DoctorTimeEditing,

      doctorTimeList: doctorTimeList,
      doctorAppointmentList: doctorAppointmentList,
      currentWeek: moment(),
    });

  }

  goNextWeek() {
    if (this.editingMode) {
      return false;
    }

    console.log('going next week');
    this.currentWeek.add(1, 'w');
  }

  goPreviousWeek() {
    if (this.editingMode) {
      return false;
    }

    console.log('going previous week');
    this.currentWeek.subtract(1, 'w');
  }

  goPresentWeek() {
    if (this.editingMode) {
      return false;
    }

    console.log('going present week');
    this.currentWeek = moment();
  }

  goNextMonth() {
    if (this.editingMode) {
      return false;
    }

    console.log('going next month');
    this.currentWeek.add(1, 'month');
  }

  goPreviousMonth() {
    if (this.editingMode) {
      return false;
    }

    console.log('going previous month');
    this.currentWeek.subtract(1, 'month');
  }

  startEditingDoctorTime()  {
    this.editingMode = true;
    this.calendarBody.startEditing();
  }

  finishEditingDoctorTime() {
    if (!this.editingMode) {
      return false;
    }

    let changes = this.calendarBody.finishEditing();

    // perform the changes
    //
    for (let eachDay of changes) {

    }

    this.editingMode = false;
  }

  cancelEditingDoctorTime() {
    if (!this.editingMode) {
      return false;
    }

    this.calendarBody.cancelEditing();
    this.editingMode = false;
  }




}
