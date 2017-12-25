# safe-window-location

[![build status](https://img.shields.io/travis/forthedamn/safe-window-location.svg)](https://travis-ci.org/forthedamn/safe-window-location)
[![code coverage](https://img.shields.io/codecov/c/github/forthedamn/safe-window-location.svg)](https://codecov.io/gh/forthedamn/safe-window-location)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/forthedamn/safe-window-location.svg)](LICENSE)

> my doozie project

## Table of Contents


## Install

[npm][]:

```sh
npm install safe-window-location
```

[yarn][]:

```sh
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
