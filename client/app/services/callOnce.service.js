import angular from 'angular';
import _ from 'lodash';

const partial =
  angular
    .module('callOnceServiceModule', []);

export default partial.name;

partial.service('CallOnce', ($q) => {
  class CallOnce {
    constructor() {
      this.private = {};
      _.extend(this.private, {
        registry: {},
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
    call(id, fn) {
      let $q = this.private.$q;
      let registry = this.private.registry;

      if (!registry[id]) {
        // first time in its kind

        // init registry
        registry[id] = {
          resolves: [],
          rejects: [],
        };

        // execute it
        let promise = null;
        promise = fn();
        promise
          .then(
            (res) => {
              // when resolve resolves all in the registry
              this.resolve(id, fn, res);
            })
          .catch(
            (res) => {
              this.reject(id, fn, res);
            });
      }

      let returnPromise = $q(
        (resolve, reject) => {
          registry[id].resolves.push(resolve);
          registry[id].rejects.push(reject);
        });

      return returnPromise;
    }

    /**
     * resolve all the resolve functions in the registry
     * @param  {[type]} identifier [description]
     * @return {[type]}            [description]
     */
    resolve(id, fn, value) {
      let registry = this.private.registry;
      if (!registry[id]) {
        throw new Error('resolving unmet identifier');
      }

      for (let resolve of registry[id].resolves) {
        resolve(value);
      }

      delete registry[id];
    }

    reject(id, fn, value) {
      let registry = this.private.registry;
      if (!registry[id]) {
        throw new Error('resolving unmet identifier');
      }

      // console.log('rejects:', registry.get(fn).rejects);
      for (let reject of registry[id].rejects) {
        reject(value);
      }

      delete registry[id];
    }
  }

  return new CallOnce();

});
