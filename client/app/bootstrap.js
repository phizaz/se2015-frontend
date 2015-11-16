// used to bootstrap the app, usually don't need to be changed

// babel polyfills
import 'babel/polyfill';

import angular from 'angular';

// materialize
import 'Materialize/dist/css/materialize.css';
import 'Materialize/dist/js/materialize.js';

// font-awesome
import 'font-awesome/css/font-awesome.css';

// quark
import './fonts/quark/stylesheet.css';

import {mainModule} from './main';

angular.element(document).ready(function() {
  angular.bootstrap(document, [ mainModule.name ]);
});
