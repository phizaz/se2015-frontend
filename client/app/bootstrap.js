// used to bootstrap the app, usually don't need to be changed

// babel polyfills
import 'babel/polyfill';

import angular from 'angular';

import {mainModule} from './main';

angular.element(document).ready(function() {
  angular.bootstrap(document, [ mainModule.name ]);
});
