import _ from 'lodash';

export class NavigatorController {
  constructor() {

    // private vars
    this.private = {};

    // 'this' is the scope
    _.extend(this, {
      currentPage: null
    });
  }
}
