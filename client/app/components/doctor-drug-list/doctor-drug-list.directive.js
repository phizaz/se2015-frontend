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

export function doctorDrugListDirective(DrugRecord) {

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
      deleteDrug: deleteDrug,

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
      // if (!isIdle()) {
      //   throw new Error('busy!');
      // }

      my.addingDrug = true;
      init();

      my.drugListByDate[my.today].push({
        name: 'ชื่อยา',
        quantity: 0,
        remark: 'รายละเอียด',
        new: true,
      });

      console.log('drugListByDate:', my.drugListByDate);

      // DrugRecord
      //   .createDrug()
      //   .then(
      //     (res) => {
      //       my.addingDrug = false;
      //       // todo
      //       my.drugList.push(res);
      //     })
      //   .catch(
      //     (error) => {
      //       my.addingDrug = false;
      //       // todo
      //       throw new Error(error);
      //     });
    }

    function editDrug(drug) {
      my.addingDrug = true;

      DrugRecord
        .editDrug(drug)
        .then(
          (res) => {
            my.addingDrug = false;
            // todo
          })
        .catch(
          (error) => {
            my.addingDrug = false;
            // todo
          });
    }

    function deleteDrug(drug) {
      my.addingDrug = true;

      DrugRecord
        .deleteDrug(drug)
        .then(
          (res) => {
            my.addingDrug = false;
            // todo
          })
        .catch(
          (error) => {
            my.addingDrug = false;
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
