import angular from 'angular';
import _ from 'lodash';
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

      addDrug: addDrug,
      editDrug: editDrug,
      deleteDrug: deleteDrug,

      // this is intentionally put here
      public: my,
    });

    function addDrug() {
      my.addingDrug = true;

      DrugRecord
        .createDrug()
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
