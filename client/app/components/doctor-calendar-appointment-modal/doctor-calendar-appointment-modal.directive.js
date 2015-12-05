import angular from 'angular';
import _ from 'lodash';
import Directive from '../directive';

// locals
import template from './doctor-calendar-appointment-modal.template.html';
import './doctor-calendar-appointment-modal.sass';

const partial =
  angular
    .module('doctorCalendarAppointmentModalDirectiveModule', [
      // directives
      require('../doctor-drug-list/doctor-drug-list.directive'),
      require('../doctor-symtom-list/doctor-symtom-list.directive'),
      ]);

export default partial.name;

partial.directive('doctorCalendarAppointmentModal', () => {

  return Directive.new({

    controllerAs: 'my',
    template: template,

    interfaces: {
      public: '=name',
      appointment: '=',
    },

    props: {
      patient: {},
      patientReport: {},
      drugInfo: {},
      symtomInfo: {},
    },

    link($scope, element) {
      _.extend(this, {
        $modal: element.find('.modal')
      });

      // this.showModal();
    },

    starter() {
      _.extend(this, {
        patient: this.appointment.patient,
        patientReport: this.appointment.patientReport,
        drugInfo: this.appointment.drugInfo,
        symtomInfo: this.appointment.symtomInfo,
      });
    },

    methods: {
      showModal() {
        this.$modal.openModal({
          dismissible: false,
        });
      },

      closeModal() {
         this.$modal.closeModal();
      },

      patientToPharmacist() {

      }
    },

  });

});
