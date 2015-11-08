import angular from 'angular';
import 'angular-ui-router';
import _ from 'lodash';

export let homeControllerModule = angular.module('homeControllerModule', []);

class HomeController {
  constructor() {


    // assigning to this ($scope)
    // should be done in one place
    // when using `this` instead of $scope
    // you have to make sure you also use 'controllerAs'
    _.extend(this, {
      _input: 0,
      test: 'aoeuaoeuao'
    });
  }


  // use getter and setter
  get input() {
    return this._input;
  }

  set input(val) {
    this._input = val;
    console.log('input:', this._input);
  }
}

homeControllerModule.controller('homeController', HomeController);
