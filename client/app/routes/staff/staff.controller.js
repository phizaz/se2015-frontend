import _ from 'lodash';
import actions from '../../redux/actions/';

export /*@ngInject*/ class StaffController {
  constructor($scope, Store) {
    _.extend(this, {
      Store: Store,
      $scope: $scope,
      form: {},

      // unconfirmedStaffs: unconfirmedStaffs,

      // onApprove: (staff) => {
      //   this.appove(staff);
      // },
      // onDiscard: (staff) => {
      //   this.discard(staff);
      // },

      // refreshing: false,
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

