import angular from 'angular';
import _ from 'lodash';
import moment from 'moment';
import Directive from '../directive';

// locals
import template from './doctor-symtom-list.template.html';
import './doctor-symtom-list.sass';

const partial =
  angular
    .module('doctorSymtomListDirectiveModule', []);

export default partial.name;

partial.directive('doctorSymtomList',
  () => {
    return Directive.new({
      controllerAs: 'my',
      template: template,

      interfaces: {
        symptoms: '=',

        addSymptom: '=',
        editSymptom: '=',
        deleteSymptom: '=',

        createSymptomFn: '&',
        editSymptomFn: '&',
        deleteSymptomFn: '&',
      },

      props: {
        new: null,
        newing: false,

        sandbox: {},
        editing: {}, //key: symptomId
      },

      methods: {
        create() {
          this.new = {
            report: null,
          };
          this.newing = true;
        },

        isToday(date) {
          return moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
        },

        submitCreate() {
          console.log('this:', this);
          this.createSymptomFn({ symptom: this.new })
            .then(() => {
              this.newing = false;
            });
        },

        cancelCreate() {
          this.newing = false;
        },

        edit(symptom) {
          let symptomId = symptom.symptom_id;
          this.sandbox = {
            ...this.sandbox,
            [symptomId]: this.symptoms
              .reduce((old, x) => {
                if (x.symptom_id !== symptomId) {
                  return old;
                }
                return { ...x };
              }, null)
          };
          this.editing[symptomId] = true;
        },

        submitEdit(symptom) {
          let symptomId = symptom.symptom_id;
          this.editSymptomFn({ symptom })
            .then(() => {
              this.editing[symptomId] = false;
            });
        },

        cancelEdit(symptom) {
          let symptomId = symptom.symptom_id;
          this.editing[symptomId] = false;
        },

        delete(symptom) {
          this.deleteSymptomFn({ symptom });
        }
      },


    });
  });
