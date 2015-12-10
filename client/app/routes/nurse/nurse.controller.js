import _ from 'lodash';
import actions from '../../redux/actions/';
import moment from 'moment';

export /*@ngInject*/ class NurseController {

  constructor($scope, Store) {
    _.extend(this, {
      Store,
      $scope,
      form: {},
      new: {
        weight: null,
        heightn: null,
        pressure: null,
      },
    });

    const mapStateToThis = (state) => {
      _.extend(this, state.nurse);
    };

    Store.$subscribe(() => {
      mapStateToThis(Store.getState());
    });

    mapStateToThis(Store.getState());
  }

  cancelCreate() {
    this.new = {
      weight: null,
      heightn: null,
      pressure: null,
    };
  }

  isToday(date) {
    return moment().format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD');
  }

  toggleView(patient) {
    console.log('toggle view patient:', patient);
    this.Store.dispatch(actions.nurseToggleView(patient.id));
  }

  searchPatient(firstname, lastname) {
    console.log('search patient name:', firstname, lastname);
    this.Store.dispatch(actions.nurseSearchPatient(firstname, lastname));
  }

  addPatientReport(patient, patientReport) {
    console.log('add patient report:', patient, patientReport);
    this.Store.dispatch(actions.patientReportAdd(patient.id, patientReport));
  }

  editPatientReport(patient, patientReport) {
    throw new Error('not implemented yet');
  }

}

