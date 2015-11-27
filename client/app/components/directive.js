/**
 * Directive Blueprint
 * adding private var capability to directives
 */

import _ from 'lodash';

const Directive = {

  constructor: constructor,
  getPrivate: getPrivate,
  new: newDirective,

};

export default Directive;

// this will be private and shared only with an instance of directive
let priv = new Map();

function constructor($scope, init) {
  // create unqiue id for a single instance of directive
  let id = Symbol();
  // cretae private var instance of the instance
  // let it be empty at first
  priv.set(id, init || {});
  // set it to the scope so it can be seen across
  // shared to link function
  $scope._id = id;

  return priv.get(id);
}

function getPrivate($scope) {
  let id = $scope._id;
  return priv.get(id);
}

function create($scope, init, obj) {
  let my = constructor($scope, init);

  _.extend(my, {public: my});

  _.extend(my, obj.props || {});

  // change the this for each methods
  for (let key of Object.keys(obj.methods)) {
    let each = obj[key];
    if (typeof each === 'function') {
      // change the `this`
      // by adding a wrapper function
      obj[key] = () => {
        each.apply(my, arguments);
      };
    }
  }

  _.extend(my, obj.methods || {});

  // run the starter
  if (obj.starter) {
    obj.starter.call(my);
  }

  // run the watches
  if (obj.watcher) {
    obj.watcher.call(my);
  }

  return my;
}

function newDirective(obj) {

  let validKeys = [
    'interfaces', 'controllerAs', 'link', 'template', 'props', 'methods', 'starter', 'watcher'
  ];

  for (let key of Object.keys(obj)) {
    if (validKeys.indexOf(key) === -1) {
      throw new Error('invalid key used: ' + key);
    }
  }

  if (!obj.controllerAs) {
    throw new Error('no contrlolerAs');
  }

  /*@ngInject*/ function controller($scope) {
    this.$scope = $scope;
    create($scope, this, obj);
  }

  return {
    restrict: 'E',
    scope: obj.interfaces,
    bindToController: true,
    controller: controller,
    controllerAs: obj.controllerAs,
    link: obj.link,
    template: obj.template,
  };

}
