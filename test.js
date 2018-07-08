const PromiseCache = require('./index.js');

const prom = function(someValue) {
  return new Promise((resolve, reject) => {
    var date = new Date();
    date = date.toString();
    resolve(date + someValue);
  });
}

const p = new PromiseCache(prom, {
  'max': 200, // Cache size of 200
  'maxAge': 100000, // Max life of 100 seconds
  'debug': true // Enable debug logs
});

p.get('time', [1])
  .then(function(val) {
    console.log('what is value for 1 ', val);
    setTimeout(() => {
      p.get('time', [2])
        .then(function(val) {
          console.log('what is value for 2 ', val);
        });
    }, 5000);
  });
