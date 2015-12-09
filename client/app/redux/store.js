import angular from 'angular';

import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/';

const combinedReducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);
const store = createStoreWithMiddleware(combinedReducer);

const partial = angular.module('storeModule', []);

export default partial.name;

partial.factory('Store', ($timeout) => {

  // inspect
  store.subscribe(() => {
    console.log('inspect state:', store.getState());
  });

  store.$subscribe = (fn) => {
    const unsubscribe = store.subscribe(() => {
      fn();
      // this will trigger $digest cycle
      $timeout();
    });
    return unsubscribe;
  };

  return store;
});
