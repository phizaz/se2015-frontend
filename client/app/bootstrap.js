// used to bootstrap the app, usually don't need to be changed

import angular from 'angular';
import {mainModule} from './main';

angular.element(document).ready(function() {
  angular.bootstrap(document, [
    mainModule.name
  ], {
    // strictDi - disable automatic function annotation for the application. This is meant to assist in finding bugs which break minified code. Defaults to false.
    strictDi: true
  });
});
