# safe-window-location
[![NPM version][npm-image]][npm-url]
[![build status](https://img.shields.io/travis/forthedamn/safe-window-location.svg)](https://travis-ci.org/forthedamn/safe-window-location)
[![code coverage](https://img.shields.io/codecov/c/github/forthedamn/safe-window-location.svg)](https://codecov.io/gh/forthedamn/safe-window-location)
[![license](https://img.shields.io/github/license/forthedamn/safe-window-location.svg)](LICENSE)

[npm-image]: https://img.shields.io/npm/v/safe-window-location.svg?style=flat-square
[npm-url]: https://npmjs.org/package/safe-window-location

> redirect parent(top) window location safely


## Install



```sh
npm install safe-window-location

yarn add safe-window-location
```


## Usage


```
// ./config/default.js

module.exports = {
  urlWhiteList: [
    /**
     * allow the hostname end with 'github.com'
     * like 'https://github.com/**'
     */
    /github\.com$/
  ]
}
```


```js
const SafeWindowLocation = require('safe-window-location');

const app = new Koa();
app.use((ctx, next) => {
  // set parent window as new location
  return SafeWindowLocation(ctx, 'new location', 'parent', 'urlWhiteList');
})
```

param | usage | required | default
--- | --- | ---| ---
ctx | koa context | yes | 
location | window location, like https://www.npmjs.com | - | /
target | window target, like window.parent | - | parent
config name | config option name | - | whiteList
