import angular from 'angular';
import _ from 'lodash';

import moment from 'moment';

export class Cache {
  constructor() {

    this.private = {};
    _.extend(this.private, {
      defaultCacheLifetime: 2 * 3600,
      cache: {},
      timeout: {},
    });

    _.extend(this, {

    });
  }

  getAllCache() {
    return this.private.cache;
  }

  safeInitCache(field) {
    let cache = this.private.cache;
    if (cache[field] === undefined) {
      cache[field] = {};
    }

    return cache[field];
  }

  isValid(field) {
    let cache = this.private.cache;
    if (cache[field] === undefined) {
      return false;
    }

    let now = moment();
    let timeout = this.private.timeout[field];

    console.log('isValid:', 'timeout:', timeout);
    if (now.isAfter(timeout)) {
      return false;
    }

    return true;
  }

  destroyCache(field) {
    let cache = this.private.cache;
    if (cache[field] === undefined) {
      throw new Error('cache field not found, mispelling ?');
    }

    delete cache[field];
  }

  getCache(field) {
    let cache = this.private.cache;
    if (cache[field] === undefined) {
      throw new Error('cache field not found, mispelling ?');
    }

    return cache[field];
  }

  /**
   * overwrites the whole cache in the same field
   * @param {[type]} field [description]
   * @param {[type]} value [description]
   */
  setCache(field, value, lifetime) {
    this.safeInitCache(field);

    let cache = this.private.cache;
    cache[field] = value;
    lifetime = lifetime || this.private.defaultCacheLifetime;
    this.private.timeout[field] =
      moment().add(lifetime, 'seconds');
    return cache[field];
  }

  /**
   * extends the current cache in the same field
   * @param  {[type]} field [description]
   * @return {[type]}       [description]
   */
  updateCache(field, value, lifetime) {
    let cache = this.safeInitCache(field);

    _.extend(cache, value);
    lifetime = lifetime || this.private.defaultCacheLifetime;
    this.private.timeout[field] =
      moment().add(lifetime, 'seconds');
    return cache;
  }
}

export let cacheServiceModule =
  angular
    .module('cacheServiceModule', [])
    .service('Cache', Cache);
