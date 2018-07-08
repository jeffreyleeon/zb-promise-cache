'use strict';

const LRU = require("lru-cache");

/** Class representing a promise cache. */
class PromiseCache {
  /**
   * Create a promise cache object.
   * @param {Promise} promise - A promise that will resolve a value to be cached
   *                            based on a set of given param(s).
   * @param {JSON} options - Configurations.
   */
  constructor(promise, options = {}) {
    this._promise = promise;

    let lruOptions = {};
    if (options.max !== undefined) {
      lruOptions.max = parseInt(options.max);
    }
    if (options.maxAge !== undefined) {
      lruOptions.maxAge = parseInt(options.maxAge);
    }
    this._internalCache = LRU(lruOptions);
    this._options = options || {};
  }

  /**
   * Get the cached value with cacheKey.
   * If cacheKey does not have value in lru cache,
   * promise will be called with params distributed to the promise called.
   * Value resolved from promise will be stored in lru cache with cacheKey
   * provided and resolved in this function at the same time.
   * @param {Promise} cacheKey -cacheKey that is going to be get the value.
   * @param {array} params - An array of params that will fit into the promise
   *                         in order to retrieve value to be cached when
   *                         there is a cache miss.
   */
  get(cacheKey = '', params = []) {
    return new Promise((resolve, reject) => {
      if (this._internalCache.has(cacheKey)) {
        const cachedValue = this._internalCache.get(cacheKey);
        if (this._options.debug === true) {
          console.log('Retrieving value ' + cachedValue + ' from cache for key ' + cacheKey);
        }
        resolve(cachedValue);
        return;
      }
      this._promise(...params)
        .then((value) => {
          if (this._options.debug === true) {
            console.log('Retrieving value ' + value + ' from promise for key ' + cacheKey);
          }
          this.set(cacheKey, value);
          resolve(value);
        })
        .catch((err) => {
          if (this._options.debug === true) {
            console.log('Error while retrieving value from promise for key ' + cacheKey);
            console.log(err);
          }
          reject(undefined);
        });
    });
  }

  /**
   * Manually set a value into cacheKey.
   * @param {string} cacheKey - cacheKey that is going to be set with value.
   * @param {any} value - value to be set into cacheKey, default ''.
   */
  set(cacheKey = '', value = '') {
    if (this._options.debug === true) {
      console.log('Setting value ' + value + ' into key ' + cacheKey);
    }
    this._internalCache.set(cacheKey, value);
  }

  /**
   * Clear all caches.
   */
  clear() {
    if (this._options.debug === true) {
      console.log('Resetting all cache');
    }
    this._internalCache.reset();
  }
}

module.exports = PromiseCache;
