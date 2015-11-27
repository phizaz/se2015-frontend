import _ from 'lodash';

export /*@ngInject*/ class HomeController {
  constructor() {
    console.log('home controller is loaded');

    this.private = {};
    this.private.input = 0;


    // assigning to this ($scope)
    // should be done in one place
    // when using `this` instead of $scope
    // you have to make sure you also use 'controllerAs'
    _.extend(this, {
      test: 'aoeuaoeuao',
    });
  }

  // use getter and setter
  get input() {
    return this.private.input;
  }

  set input(val) {
    this.private.input = val;
    console.log('input:', this.input);
  }
}
