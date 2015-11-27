import _ from 'lodash';

/*@ngInject*/ class NavigatorController {
  constructor() {

    // private vars
    this.private = {};

    // 'this' is the scope
    _.extend(this, {
      currentPage: null
    });
  }
}
