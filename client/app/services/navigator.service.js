import angular from 'angular';
import _ from 'lodash';

export let navigatorServiceModule =
  angular.module('navigatorServiceModule', []);

export let Navigator =
  class Navigator {
    constructor() {

      // set private vars (although this is not the real private, but the real private is not all that good it reduces testablitiy)
      this.private = {};
      this.private.currentPage = null;
      this.private.validPages = {};

      // set public vars (if any)
      _.extend(this, {

      });
    }

    isPageValid(page) {
      return this.private.validPages[page] !== undefined;
    }

    get currentPage() {
      return this.private.currentPage;
    }

    set currentPage(page) {
      this.private.validPages[page] = true;
      this.private.currentPage = page;
    }
  };

navigatorServiceModule.service('Navigator', Navigator);
