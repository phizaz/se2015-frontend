import angular from 'angular';
import _ from 'lodash';
import Directive from '../directive';
import actions from '../../redux/actions';

// locals
import template from './doctor-calendar-appointment-modal.template.html';
import './doctor-calendar-appointment-modal.sass';

const partial =
  angular
    .module('doctorCalendarAppointmentModalDirectiveModule', [
      // service
      require('../../redux/store'),

      // directives
      require('../doctor-drug-list/doctor-drug-list.directive'),
      require('../doctor-symtom-list/doctor-symtom-list.directive'),
    ]);

export default partial.name;

partial.directive('doctorCalendarAppointmentModal', (Store) => {

  return Directive.new({

    controllerAs: 'my',
    template: template,

    interfaces: {
      public: '=name',
      appointment: '=',
    },

    props: {
      patient: {},
      sandbox: {
        drugAllergic: null,
      },
      drugAllergicEditing: false,
    },

    link($scope, element) {
      _.extend(this, {
        $modal: element.find('.modal')
      });

      this.showModal();
    },

    watcher() {
      const mapStateToThis = (state) => {
        let patientId = this.appointment.patient.id;
        let doctor = state.doctor;
        _.extend(this, doctor);
        _.extend(this, {
          drugAllergic: doctor.drugAllergic[patientId],
          symptoms: doctor.symptoms[patientId],
          drugs: doctor.drugs[patientId],
        });
      };

      Store.$subscribe(() => {
        mapStateToThis(Store.getState());
      });

      mapStateToThis(Store.getState());
    },

    starter() {
      this.patient = this.appointment.patient;
      let symptoms = this.patient.symptomReports;
      let drugs = this.patient.drugRecords;
      let drugAllergic = this.patient.drugAllergic;
      this.setSymptom(symptoms);
      this.setDrug(drugs);
      this.setDrugAllergic(drugAllergic);
    },

    methods: {
      drugAllergicStartEdit() {
        console.log('drugallergic edit start');
        this.sandbox.drugAllergic = this.drugAllergic;
        this.drugAllergicEditing = true;
      },

      drugAllergicSubmitEdit(drugAllergic) {
        console.log('drugallergic edit submit');
        this.drugAllergicEdit(drugAllergic)
          .then(() => {
            this.drugAllergicEditing = false;
          });
      },

      drugAllergicCancelEdit() {
        this.drugAllergicEditing = false;
      },

      showModal() {
        this.$modal.openModal({
          dismissible: false,
        });
      },

      closeModal() {
        this.$modal.closeModal();
      },

      setSymptom(symptoms) {
        let patientId = this.patient.id;
        console.log('setting symptom:', symptoms);
        Store.dispatch(actions.symptomSet(patientId, symptoms));
      },

      setDrug(drugs) {
        let patientId = this.patient.id;
        console.log('setting drug:', drugs);
        Store.dispatch(actions.drugSet(patientId, drugs));
      },

      setDrugAllergic(drugAllergic) {
        let patientId = this.patient.id;
        console.log('setting drugAllergic:', drugAllergic);
        Store.dispatch(actions.drugAllergicSet(patientId, drugAllergic));
      },

      drugAllergicEdit(drugAllergic) {
        let patientId = this.patient.id;
        console.log('editing drug allergic:', drugAllergic);
        return Store.dispatch(actions.editDrugAllergic(patientId, drugAllergic));
      },

      symptomAdd(symptom) {
        let patientId = this.patient.id;
        console.log('adding symptom:', symptom);
        return Store.dispatch(actions.symptomAdd(patientId, symptom.report));
      },

      symptomEdit(symptom) {
        let patientId = this.patient.id;
        console.log('editing symptom:', symptom);
        return Store.dispatch(actions.symptomEdit(patientId, symptom.symptom_id, symptom.report));
      },

      symptomDelete(symptom) {
        let patientId = this.patient.id;
        console.log('delete symptom:', symptom);
        return Store.dispatch(actions.symptomDelete(patientId, symptom.symptom_id));
      },

      drugAdd(drug) {
        let patientId = this.patient.id;
        console.log('adding drug:', drug);
        return Store.dispatch(actions.drugAdd(patientId, drug));
      },

      drugEdit(drug) {
        let patientId = this.patient.id;
        console.log('editing drug:', drug);
        return Store.dispatch(actions.drugEdit(patientId, drug.drug_id, drug));
      },

      drugDelete(drug) {
        let patientId = this.patient.id;
        console.log('delete drug:', drug);
        return Store.dispatch(actions.drugDelete(patientId, drug.drug_id));
      },

    },

  });

});
