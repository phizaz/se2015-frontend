import angular from 'angular';
import _ from 'lodash';
import moment from 'moment';
import Directive from '../directive';

// locals
import template from './doctor-drug-list.template.html';
import './doctor-drug-list.sass';

const partial =
  angular
    .module('doctorDrugListDirectiveModule', []);

export default partial.name;

partial.directive('doctorDrugList',
  () => {
    return Directive.new({
      controllerAs: 'my',
      template: template,

      interfaces: {
        drugs: '=',

        addDrug: '=',
        editDrug: '=',
        deleteDrug: '=',

        createDrugFn: '&',
        editDrugFn: '&',
        deleteDrugFn: '&',
      },

      props: {
        new: null,
        newing: false,

        sandbox: {},
        editing: {}, //key: drugId
      },

      methods: {
        create() {
          this.new = {
            name: null,
            quantity: 1,
            remark: null,
          };
          this.newing = true;
        },

        isToday(date) {
          return moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
        },

        submitCreate() {
          console.log('this:', this);
          this.createDrugFn({ drug: this.new })
            .then(() => {
              this.newing = false;
            });
        },

        cancelCreate() {
          this.newing = false;
        },

        edit(drug) {
          let drugId = drug.drug_id;
          this.sandbox = {
            ...this.sandbox,
            [drugId]: this.drugs
              .reduce((old, x) => {
                if (x.drug_id !== drugId) {
                  return old;
                }
                return { ...x };
              }, null)
          };
          this.editing[drugId] = true;
        },

        submitEdit(drug) {
          let drugId = drug.drug_id;
          this.editDrugFn({ drug })
            .then(() => {
              this.editing[drugId] = false;
            });
        },

        cancelEdit(drug) {
          let drugId = drug.drug_id;
          this.editing[drugId] = false;
        },

        delete(drug) {
          this.deleteDrugFn({ drug });
        }
      },
    });
  });

