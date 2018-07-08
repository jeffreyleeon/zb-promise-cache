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
}

module.exports = PromiseCache;
