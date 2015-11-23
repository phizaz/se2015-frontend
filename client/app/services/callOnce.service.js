import angular from 'angular';
import _ from 'lodash';


export class CallOnce {
  constructor($q) {
    this.private = {};
    _.extend(this.private, {
      registry: new WeakMap(),
      $q: $q,
    });

    _.extend(this, {

    });
  }

  /**
   * register the event that you don't want it to be called many times
   * in the same moment (save resources), you just want use the result
   * from its peers
   * @param  {Function} fn         function to be executed, once,
   *                               should return a promise
   * @return {[type]}              a promise
   */
  call(fn) {
    let $q = this.private.$q;
    let registry = this.private.registry;

    if (!registry.has(fn)) {
      // first time in its kind

      // init registry
      registry.set(fn, {
        resolves: [],
        rejects: [],
      });

      // execute it
      let promise = null;
      promise = fn();
      promise
        .then(
          (res) => {
            // when resolve resolves all in the registry
            this.resolve(fn, res);
          })
        .catch(
          (res) => {
            this.reject(fn, res);
          });
    }

    let returnPromise = $q(
      (resolve, reject) => {
        registry.get(fn).resolves.push(resolve);
        registry.get(fn).rejects.push(reject);
      });

    return returnPromise;
  }

  /**
   * resolve all the resolve functions in the registry
   * @param  {[type]} identifier [description]
   * @return {[type]}            [description]
   */
  resolve(fn, value) {
    let registry = this.private.registry;
    if (!registry.has(fn)) {
      throw new Error('resolving unmet identifier');
    }

    for (let resolve of registry.get(fn).resolves) {
      resolve(value);
    }

    registry.delete(fn);
  }

  reject(fn, value) {
    let registry = this.private.registry;
    if (!registry.has(fn)) {
      throw new Error('resolving unmet identifier');
    }

    // console.log('rejects:', registry.get(fn).rejects);
    for (let reject of registry.get(fn).rejects) {
      reject(value);
    }

    registry.delete(fn);
  }


}

export let callOnceServiceModule =
  angular
    .module('callOnceServiceModule', [])
    .service('CallOnce', CallOnce);
