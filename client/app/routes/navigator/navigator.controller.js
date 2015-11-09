import _ from 'lodash';

export let NavigatorController =
  class NavigatorController {
    constructor(Navigator) {

      // private vars
      this.private = {};
      this.private.Navigator = Navigator;

      // 'this' is the scope
      _.extend(this, {

      });
    }

    getCurrentPage() {
      return this.private.Navigator.currentPage;
    }
  };
