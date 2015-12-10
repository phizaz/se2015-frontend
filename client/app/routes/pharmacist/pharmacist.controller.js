import _ from 'lodash';
import actions from '../../redux/actions/';
import moment from 'moment';

export /*@ngInject*/ class PharmacistController {

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
      _.extend(this, state.pharmacist);
    };

    Store.$subscribe(() => {
      mapStateToThis(Store.getState());
    });

    mapStateToThis(Store.getState());

    this.fetchPatient();
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
    this.Store.dispatch(actions.pharmacistToggleView(patient.id));
  }

  fetchPatient() {
    console.log('fetcihng patient');
    this.Store.dispatch(actions.pharmacistFetch());
  }

  finishPatient(patient) {
    console.log('finishing patient:', patient);
    this.Store.dispatch(actions.pharmacistFinish(patient.id));
  }

}

