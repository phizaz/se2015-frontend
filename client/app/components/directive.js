/**
 * Directive Blueprint
 * adding private var capability to directives
 */

export const DirectiveBlueprint = {

  constructor: constructor,
  getPrivate: getPrivate,

};


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
