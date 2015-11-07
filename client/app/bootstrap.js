// used to bootstrap the app, usually don't need to be changed

// babel polyfills
import 'babel/polyfill';

// bootstrap is included natively
import 'bootstrap-sass!../../bootstrap-sass.config.js';

import angular from 'angular';
import {mainModule} from './main';

angular.element(document).ready(function() {
  angular.bootstrap(document, [ mainModule.name ]);
});
