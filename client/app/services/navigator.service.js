// import angular from 'angular';
// import _ from 'lodash';

// import {messagerServiceModule} from './messager.service.js';

// export let navigatorServiceModule =
//   angular.module('navigatorServiceModule', [
//     messagerServiceModule.name,
//   ]);

// export /*@ngInject*/ class Navigator {
//   constructor(Messager) {

//     // set private vars (although this is not the real private, but the real private is not all that good it reduces testablitiy)
//     this.private = {};
//     this.private.Messager = Messager;
//     this.private.currentPage = null;
//     this.private.validPages = {};

//     // set public vars (if any)
//     _.extend(this, {

//     });
//   }

//   isPageValid(page) {
//     return this.private.validPages[page] !== undefined;
//   }

//   get currentPage() {
//     return this.private.currentPage;
//   }

//   set currentPage(page) {
//     this.private.validPages[page] = true;
//     this.private.currentPage = page;

//     // tell the world that the page has changed
//     this.private.Messager.broadcast('pageChanged',
//       {
//         page: this.currentPage
//       });
//   }
// }

// navigatorServiceModule.service('Navigator', Navigator);
