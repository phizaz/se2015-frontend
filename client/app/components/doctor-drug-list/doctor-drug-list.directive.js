import angular from 'angular';
import _ from 'lodash';
import moment from 'moment';
import {DirectiveBlueprint} from '../directive';

// services
import {drugRecordServiceModule} from '../../services/drugRecord.service';

// locals
import template from './doctor-drug-list.template.html';
import './doctor-drug-list.sass';

export let doctorDrugListDirectiveModule =
  angular
    .module('doctorDrugListDirectiveModule', [
      drugRecordServiceModule.name,
      ])
    .directive('doctorDrugList', doctorDrugListDirective);

function doctorDrugListDirective(DrugRecord) {

  let shared = {};

  function controller($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);

    _.extend(my, {
      addingDrug: false,
      editingDrug: false,
      deletingDrug: false,
      // editable
      drugListByDate: {},
      days: [],
      momentDays: [],
      newDrug: {},
      today: moment().format('YYYY-MM-DD'),

      addDrug: addDrug,
      editDrug: editDrug,
      cancelEditDrug: cancelEditDrug,
      performEditDrug: performEditDrug,
      deleteDrug: deleteDrug,
      isIdle: isIdle,

      // this is intentionally put here
      public: my,
    });

    init();

    function init() {
      my.drugListByDate = [];
      // drugListByDate & days & momentDays
      for (let drug of (my.drugList || [])) {
        let date = moment(drug.created_at).format('YYYY-MM-DD');

        if (!my.drugListByDate[date]) {
          my.drugListByDate[date] = [];
          my.days.push(date);
          my.momentDays.push(moment(date));
        }

        my.drugListByDate[date].push(angular.copy(drug));
      }
      console.log('drugListByDate:', my.drugListByDate);
    }

    function isIdle() {
      return !my.addingDrug && !my.editingDrug && !my.deletingDrug;
    }

    function addDrug() {
      if (!isIdle()) {
        throw new Error('busy!');
      }

      // my.addingDrug = true;
      init();

      let newDrug = {
        name: '',
        quantity: undefined,
        remark: '',
        new: true,
      };
      my.drugListByDate[my.today].push(newDrug);
      editDrug(newDrug);
      console.log('drugListByDate:', my.drugListByDate);

    }

    function editDrug(drug) {
      if (!isIdle()) {
        throw new Error('busy!');
      }

      my.editingDrug = true;
      drug.editing = true;
    }

    function cancelEditDrug(drug) {
      my.editingDrug = false;
      init();
    }

    function performEditDrug(drug) {
      my.editingDrug = true;

      DrugRecord
        .editDrug(drug)
        .then(
          (res) => {
            my.editingDrug = false;
            // update in the prototype
            let item = _.find(my.drugList, { drug_id: drug.drug_id });
            angular.copy(drug, item);
            console.log('new drugList:', my.drugList);
            init();
          })
        .catch(
          (error) => {
            my.editingDrug = false;
            // todo
          });
    }

    function deleteDrug(drug) {
      if (!isIdle()) {
        throw new Error('busy!');
      }

      my.deletingDrug = true;

      DrugRecord
        .deleteDrug(drug)
        .then(
          (res) => {
            my.deletingDrug = false;
            // delete from the prototype
            let idx = _.findIndex(my.drugList, drug);
            my.drugList.splice(idx, 1);
            console.log('new drugList:', my.drugList);
            init();
          })
        .catch(
          (error) => {
            my.deletingDrug = false;
            // todo
          });
    }
  }

  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);

    _.extend(my, {
      element: element,
      attrs: attrs,
    });
  }

  return {
    restrict: 'E',
    scope: {
      'drugList': '=',
    },
    bindToController: true,
    controller: controller,
    controllerAs: 'my',
    link: link,
    template: template,
  };

}
