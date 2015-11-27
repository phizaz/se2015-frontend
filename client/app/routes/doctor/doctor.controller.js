import angular from 'angular';
import _ from 'lodash';
import moment from 'moment';

/*@ngInject*/ class DoctorController {
  constructor(DoctorTime, DoctorTimeEditing, userInfo, doctorTimeList, doctorAppointmentList, $q) {

    console.log('userInfo:', userInfo);

    // for development
    // setTimeout(
    //   () => this.startEditingDoctorTime(), 100);

    _.extend(this, {
      userInfo: userInfo,
      editingMode: false,
      DoctorTime: DoctorTime,
      DoctorTimeEditing: DoctorTimeEditing,
      $q: $q,

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

  promptEditingDoctorTime() {
    if (!this.editingMode) {
      return false;
    }

    // ask for damages
    let damages = this.calendarBody.askDamage();
    // show modal
    this.calendarPrompt.init(damages);
  }

  finishEditingDoctorTime() {
    if (!this.editingMode) {
      return false;
    }

    this.calendarPrompt.setLoading(true);
    let changes = this.calendarBody.askChanges();

    console.log('changes summary:', changes);

    let allCreates = [];
    let allDeletes = [];

    for (let change of changes) {
      allCreates = allCreates.concat(change.create);
      allDeletes = allDeletes.concat(change.delete);
    }

    // call backend with { create: , delete: }
    //
    console.log('creates:', allCreates);
    console.log('deletes:', allDeletes);

    this.DoctorTime
      .updateDoctorTime(this.userInfo, allCreates, allDeletes)
      .then(
        (res) => {

          console.log('finish edit doctortime: ', res);

          // refresh
          return this.$q.all([
            this.DoctorTime.getDoctorAppointmentList(this.userInfo),
            this.DoctorTime.getDoctorTimeList(this.userInfo),
            ]);
        })
      .then(
        (results) => {

          let appointments = results[0];
          let doctorTimes = results[1];

          console.log('appointments:', appointments);
          console.log('doctorTimes', doctorTimes);

          this.doctorTimeList = doctorTimes;
          this.doctorAppointmentList = appointments;
          this.calendarBody.finishEditing();
          this.calendarBody.init(appointments, doctorTimes);

          this.editingMode = false;
          this.calendarPrompt.setLoading(false);
          this.calendarPrompt.closeModal();

        })
      .catch(
        (res) => {
          console.log(res);
          throw new Error('finish edit doctortime');
        });

  }

  cancelEditingDoctorTime() {
    if (!this.editingMode) {
      return false;
    }

    this.calendarBody.cancelEditing();
    this.editingMode = false;
  }

}
