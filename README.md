# zb-promise-cache
A cache object that can cache result of a promise for certain period of time

# zb-promise-cache
A cache object that can cache result of a promise for certain period of time

# Simple usage

```

const PromiseCache = require('zb-promise-cache');


const simplePromise = function() {
  return new Promise((resolve, reject) => {
    resolve('hello world');
  });
}

const promiseCache = new PromiseCache(simplePromise);

p.get('testing')
  .then(function(val) {
    console.log(val); // 'hello world'

    // At this point 'hello world' is already cached
    // into 'promiseCache' object. Next time you call
    // p.get('testing'), the value will be retrieved
    // from cache.
  });

```

# Advanced usage

```

const PromiseCache = require('zb-promise-cache');


const advancedPromise = function(someValue) {
  return new Promise((resolve, reject) => {
    resolve('hello world ' + someValue);
  });
}

const promiseCache = new PromiseCache(advancedPromise);

p.get('advanced testing', [1])
  .then(function(val) {
    console.log(val); // 'hello world 1'

    // At this point 'hello world 1' is already cached
    // into 'promiseCache' object. Next time you call
    // p.get('advanced testing', '2'), the value will be retrieved from cache
    // and will resolve 'hello world 1' in stead of 'hello world 2' unless cache expired.
  });

```

# Options

```

const PromiseCache = require('zb-promise-cache');


const simplePromise = function() {
  return new Promise((resolve, reject) => {
    resolve('hello world');
  });
}

const options = {
  'max': 200 // Max lru cache size, default INVINITY
  'maxAge': 100000 // Max cache life time in ms, default, INVINITY
  'debug': true // Display debug msg in console
};

const promiseCache = new PromiseCache(simplePromise, options);

p.get('testing')
  .then(function(val) {
    console.log(val); // 'hello world'

	// Stored in lru cache with max cache size of 200
    // cache life time 100000ms
    // and showing debug logs in console
  });

```
