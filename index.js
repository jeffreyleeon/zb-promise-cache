'use strict';

const LRU = require("lru-cache");

class PromiseCache {
  constructor(promise, options) {
    this._promise = promise;
    this._options = options || {};
  }
}

module.exports = PromiseCache;
