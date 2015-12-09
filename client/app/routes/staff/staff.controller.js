import _ from 'lodash';
import actions from '../../redux/actions/';

export /*@ngInject*/ class StaffController {
  constructor($scope, Store) {
    _.extend(this, {
      Store: Store,
      $scope: $scope,
      form: {},
      makeAppointmentModals: {},
      deleteAppointmentModals: {},

      searchPatientNoArg() {
        console.log('call search patient no arg');
        this.searchPatient(this.form.firstname, this.form.lastname);
      }
    });

    const mapStateToThis = (state) => {
      _.extend(this, state.staff);
      // console.log('this:', this);
    };

    // live update
    Store.$subscribe(() => {
      mapStateToThis(Store.getState());
    });
    // init call
    mapStateToThis(Store.getState());
    this.fetchUnconfirmedStaff();
  }

  toggleView(patient) {
    console.log('toggling the patient: ', patient);
    this.Store.dispatch(
      actions.staffToggleView(patient.id));
  }

  toggleEmpView(emp) {
    console.log('toggleing the emp:', emp);
    this.Store.dispatch(
      actions.staffToggleEmpView(emp.emp_id));
  }

  addAppointment(patient) {
    this.makeAppointmentModals[patient.id].showModal();
  }

  deleteAppointment(appointment) {
    console.log('gonna delete:', appointment, 'modals:', this.deleteAppointmentModals);
    this.deleteAppointmentModals[appointment.appointment_id].showModal();
  }

  searchPatient(firstname, lastname) {
    console.log('seacrhing for patients...');
    this.Store.dispatch(
      actions.staffSearchPatient(firstname, lastname));
  }

  approveStaff(staff) {
    console.log('approving staff:', staff);
    this.Store.dispatch(
      actions.staffApprove(staff.emp_id));
  }

  discardStaff(staff) {
    console.log('dismiss staff:', staff);
    this.Store.dispatch(
      actions.staffDismiss(staff.emp_id));
  }

  fetchUnconfirmedStaff() {
    console.log('fetchUnconfirmedStaff staff');
    this.Store.dispatch(
      actions.staffFetchUnconfirmedStaff());
  }
}

