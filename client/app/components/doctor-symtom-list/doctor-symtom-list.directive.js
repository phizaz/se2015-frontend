import angular from 'angular';
import _ from 'lodash';
import Directive from '../directive';

// service
import {symtomReportServiceModule} from '../../services/symtomReport.service';

// locals
import template from './doctor-symtom-list.template.html';
import './doctor-symtom-list.sass';

const partial =
  angular
    .module('doctorSymtomListDirectiveModule', [
      symtomReportServiceModule.name,
      ]);

export default partial.name;

partial.directive('doctorSymtomList', doctorSymtomListDirective);

function doctorSymtomListDirective(SymtomReport) {

  let shared = {};

  function controller($scope) {
    let my = Directive.constructor($scope, this);

    _.extend(my, {
      addingSymtom: false,
      editingSymtom: false,
      deletingSymtom: false,

      addSymtom: addSymtom,
      editSymtom: editSymtom,
      deleteSymtom: deleteSymtom,

      // this is intentionally put here
      public: my,
    });

    function addSymtom() {
      my.addingSymtom = true;

      SymtomReport
        .createSymtom()
        .then(
          (res) => {
            my.addingSymtom = false;
            // todo
          })
        .catch(
          (error) => {
            my.addingSymtom = false;
            // todo
          });
    }

    function editSymtom(symtom) {
      my.addingSymtom = true;

      SymtomReport
        .editSymtom(symtom)
        .then(
          (res) => {
            my.addingSymtom = false;
            // todo
          })
        .catch(
          (error) => {
            my.addingSymtom = false;
            // todo
          });
    }

    function deleteSymtom(symtom) {
      my.addingSymtom = true;

      SymtomReport
        .deleteSymtom(symtom)
        .then(
          (res) => {
            my.addingSymtom = false;
            // todo
          })
        .catch(
          (error) => {
            my.addingSymtom = false;
            // todo
          });
    }
  }

  function link($scope, element, attrs) {
    let my = Directive.getPrivate($scope);

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
