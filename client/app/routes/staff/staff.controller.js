import _ from 'lodash';
import actions from '../../redux/actions/';

export /*@ngInject*/ class StaffController {
  constructor($scope, Store) {
    _.extend(this, {
      Store: Store,
      $scope: $scope,
      form: {},
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

  addAppointment(patient) {
    throw new Error('not implemented yet');
  }

  deleteAppointment(appointment) {
    throw new Error('not implemented yet');
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

