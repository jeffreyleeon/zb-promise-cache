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
