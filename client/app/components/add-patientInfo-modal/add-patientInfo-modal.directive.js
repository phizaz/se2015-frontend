/**
 * add-patientInfo-modal
 * <add-patientInfo-modal name="..."></add-patientInfo-modal>
 * ex.
 * <add-patientInfo-modal name="home.loginModal"></add-patientInfo-modal>
 * now, you can call home.loginModal.show()
 */

import angular from 'angular';
import _ from 'lodash';
import {DirectiveBlueprint} from '../directive.js';

import addPatientInfoModalTemplate from './add-patientInfo-modal.template.html';
import './add-patientInfo-modal.sass';

let partial =
  angular.module('addPatientInfoModalDirectiveModule', [
    require('../../services/login.service')
  ]);

export default partial.name;

partial.directive('addPatientInfoModal', addPatientInfoModalDirective);

function addPatientInfoModalDirective(Login) {
  console.log('login modal is loaded');
  let shared = {};


  function link($scope, element, attrs) {
    let my = DirectiveBlueprint.getPrivate($scope);
    my.element = element;
    my.attrs = attrs;
  }
  function controller ($scope) {
    let my = DirectiveBlueprint.constructor($scope, this);
    console.log('login modal controller is loaded');
    let api = {
        show: show
      };
    // expose 'api' to the outside (=name)
    function show() {
      console.log('show');
      my.element.children('.modal').openModal();
    }
    function close() {
      my.element.children.closeModal();
    }
    _.extend(this, {
      api: api,
      login: () => {
        Login
          .takeLogin(this.loginForm.username,this.loginForm.password)
          .then((res) => {
            close();
          });
      }

    });
  }




  return {
    // this direcitve will apply to tag's name only,
    // i.e. <add-patientInfo-modal>, note that addPatientInfoModal will be
    // transformed to add-patientInfo-modal
    restrict: 'E',
    // create its isolate scope that will not interfere with
    // the outside world
    // scope is equivalent to `this` in the class
    scope: {
      api: '=name'
    },
    // always use bindToController
    // so that the code will work as expected
    bindToController: true,
    controller: controller,
    // this is var's name to be used in template
    // to use controller's `this`
    controllerAs: 'addPatientInfoModal',
    link: link,
    template: addPatientInfoModalTemplate,
  };
}
