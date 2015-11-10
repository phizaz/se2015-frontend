import _ from 'lodash';

export class NavigatorController {
  constructor(Navigator, Messager) {

    Messager.on('pageChanged',
      (message) => {
        this.currentPage = message.page;
      });

    // private vars
    this.private = {};
    this.private.Navigator = Navigator;

    // 'this' is the scope
    _.extend(this, {
      currentPage: null
    });
  }
}
