import _ from 'lodash';

/*@ngInject*/ class StaffController {
  constructor(Staff, unconfirmedStaffs, $scope) {

    _.extend(this, {
      Staff: Staff,
      $scope: $scope,
      unconfirmedStaffs: unconfirmedStaffs,
      form: {},
      searchResult: [],
      onApprove: (staff) => {
        this.appove(staff);
      },
      onDiscard: (staff) => {
        this.discard(staff);
      },

      refreshing: false,
      searching: false,
    });
  }

  search(firstname, lastname) {
    this.searching = true;

    this.Staff
      .getPatient(firstname, lastname)
      .then(
        (res) => {
          this.searching = false;
          this.searchResult = res;
          console.log(this.searchResult);
        });
  }

  appove(staff) {
    console.log('approving staff:', staff);
    staff.approving = true;

    this.Staff
      .approveStaff(staff)
      .then(
        (res) => {
          staff.approving = false;
          // remove from the list
          let idx = _.findIndex(this.unconfirmedStaffs, {emp_id: staff.emp_id});
          this.unconfirmedStaffs.splice(idx, 1);
        });
  }

  discard(staff) {
    staff.discarding = true;

    this.Staff
      .discardStaff(staff)
      .then(
        (res) => {
          staff.discarding = false;
          // remove from the list
          let idx = _.findIndex(this.unconfirmedStaffs, {emp_id: staff.emp_id});
          this.unconfirmedStaffs.splice(idx, 1);
        });
  }

  refresh() {
    this.refreshing = true;

    this.Staff
      .getUnconfirmedStaff()
      .then(
        (res) => {
          this.refreshing = false;
          this.unconfirmedStaffs = res;
        })
      .catch(
        (res) => {
          console.log(res);
          throw new Error('refresh');
        });

  }

}

