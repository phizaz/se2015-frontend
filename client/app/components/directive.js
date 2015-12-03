/**
 * Directive Blueprint
 * adding private var capability to directives
 */

import _ from 'lodash';

const Directive = {

  constructor: createPrivate,
  getPrivate: getPrivate,
  new: newDirective,

};

export default Directive;

// this will be private and shared only with an instance of directive
let priv = new Map();

function createPrivate($scope, init) {
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

function createController($scope, init, obj) {
  let my = createPrivate($scope, init);

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
    obj.starter.call(my, $scope);
  }

  // run the watches
  if (obj.watcher) {
    obj.watcher.call(my, $scope);
  }

  return my;
}

function newDirective(obj) {
  // just some checking ...
  // making sure that there are no alien parameters
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
    createController($scope, this, obj);
  }

  // add `this` to the link function, but keeping everything else the same
  let linkFunc = obj.link;
  obj.link = ($scope, element, attrs) => {
    let my = getPrivate($scope);

    _.extend(my, {
      element, attrs
    });

    if (linkFunc) {
      linkFunc.apply(my, [
        $scope,
        element,
        attrs,
        ...arguments
      ]);
    }
  };

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
