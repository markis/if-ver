# if-ver - simple node version check

[![node](https://img.shields.io/node/v/if-ver.svg)](https://www.npmjs.com/package/if-ver)
[![Travis](https://img.shields.io/travis/markis/if-ver.svg)](https://travis-ci.org/markis/if-ver)
[![AppVeyor](https://img.shields.io/appveyor/ci/markis/if-ver.svg)](https://ci.appveyor.com/project/markis/if-ver)

## Description

Check installed node version against a requested version using an comparison operator. 
The main purpose of this script is make it easier to only run scripts if the version is correct.

### Installation

``` shell
npm install if-ver --save-dev
```

``` shell
npm add yarn --dev
```

## Usage

``` shell
if-ver [comparison-operator] [semantic-version]
```

``` json
"scripts": {
  "test": "if-ver -gt 4 && run-node-4-thing || return 0"
}
```

### Comparison operators:

Similar to the bash comparision operators:

  * -eq - is equal to
  * -ne - is not equal to
  * -gt - is greater than
  * -lt - is less than
  * -ge - is greater than or equal to
  * -le - is less than or equal to

## Examples:

  Only run eslint if node version is at least 4 (else do nothing):
  ``` shell
  if-ver -ge 4 && eslint *.js || return 0
  ```

  Only compile typescript if node version is at least 4.2 (else do nothing):
  ``` shell
  if-ver -ge 4.2 && tsc || return 0
  ```

  Only run webpack if node version is (>= 4.3 && <5) || > 5.10 (else do nothing):
  ``` shell
  (if-ver -ge 4.3 && if-ver -lt 5) || if-ver -gt 5.10) && webpack || return 0
  ```
