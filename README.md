# egg-passport-citi

> Citi passport plugin for egg.

[![NPM version][npm-image]][npm-url]
[![Build Status](https://travis-ci.com/Jeff-Tian/egg-passport-citi.svg?branch=master)](https://travis-ci.com/Jeff-Tian/egg-passport-citi)
[![codecov](https://codecov.io/gh/Jeff-Tian/egg-passport-citi/branch/master/graph/badge.svg)](https://codecov.io/gh/Jeff-Tian/egg-passport-citi)
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-passport-citi.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-passport-citi
[david-image]: https://img.shields.io/david/jeff-tian/egg-passport-citi.svg?style=flat-square
[david-url]: https://david-dm.org/jeff-tian/egg-passport-citi
[snyk-image]: https://snyk.io/test/npm/egg-passport-citi/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-passport-citi
[download-image]: https://img.shields.io/npm/dm/egg-passport-citi.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-passport-citi

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Jeff-Tian_egg-passport-citi)](https://sonarcloud.io/dashboard?id=Jeff-Tian_egg-passport-citi)

<!--
Description here.
-->

## Example

Open [https://uniheart.herokuapp.com/passport/citi](https://uniheart.herokuapp.com/passport/citi) to see the result.

## Install

```bash
$ npm i egg-passport-citi --save
```

## Usage

```js
// {app_root}/config/plugin.[t|j]s
exports.passportCiti = {
  enable: true,
  package: "egg-passport-citi"
};
```

## Configuration

```js
// {app_root}/config/config.default.[t|j]s
exports.passportCiti = {
  key: "your oauth key",
  secret: "your oauth secret",
  callbackURL: "/your/callback-or-redirect/url",
  // state: your customized state function, default to uuid()
  state: function yourStateFunction(ctx) {}
};
```

## Mount on your app

```typescript
// {app_root}/app/router.ts
import { Application } from "egg";

export default (app: Application) => {
  app.passport.mount("citi", app.config.passportCiti);
};
```

see [config/config.default.ts](config/config.default.ts) for more detail.

## Example

- http://uniheart.pa-ca.me/passport/citi
- https://jeff-tian.github.io/me/

![运行截图](https://github.com/Jeff-Tian/me/releases/download/v0.0.3/screenshot.gif)

Testing Accounts:

|   User ID    |  Password  |
| :----------: | :--------: |
| SandboxUser1 | P@ssUser1$ |
| SandboxUser2 | P@ssUser2$ |
| SandboxUser3 | P@ssUser3$ |
| SandboxUser4 | P@ssUser4$ |
| SandboxUser5 | P@ssUser5$ |

## License

[MIT](LICENSE)

## Test

```shell
npm run test-local
```

## Release Notes:
