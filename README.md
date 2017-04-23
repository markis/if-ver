# if-ver - simple node version check

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/53627a3cfd4a4d10a1fdd398dade6e1f)](https://www.codacy.com/app/markis/if-ver?utm_source=github.com&utm_medium=referral&utm_content=markis/if-ver&utm_campaign=badger)
[![node](https://img.shields.io/node/v/if-ver.svg)](https://www.npmjs.com/package/if-ver)
[![Travis](https://img.shields.io/travis/markis/if-ver.svg)](https://travis-ci.org/markis/if-ver)
[![AppVeyor](https://img.shields.io/appveyor/ci/markis/if-ver.svg)](https://ci.appveyor.com/project/markis/if-ver)
[![David](https://img.shields.io/david/markis/if-ver.svg)](https://david-dm.org/markis/if-ver)
[![Codacy coverage](https://img.shields.io/codacy/coverage/53627a3cfd4a4d10a1fdd398dade6e1f.svg)](https://www.codacy.com/app/markis/if-ver/files)
[![Codacy grade](https://img.shields.io/codacy/grade/53627a3cfd4a4d10a1fdd398dade6e1f.svg)](https://www.codacy.com/app/markis/if-ver)

## Description

Check installed node version against a requested version using an comparison operator. 
The main purpose of this script is make it easier to only run scripts if the node version is correct.
This is meant to be simple and have zero dependencies, so that it will be very exportable and versatile.

### Installation

```
npm install if-ver --save-dev
```

```
yarn add if-ver --dev
```

## Usage

```
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
  ``` json
  "scripts": {
    "lint": "if-ver -gt 4 && eslint *.js || return 0"
  }
  ```

  Only compile typescript if node version is at least 4.2 (else do nothing):
  ``` json
  "scripts": {
    "build": "if-ver -gt 4.2 && tsc || return 0"
  }
  ```

  Only run webpack if node version is (>= 4.3 && <5) || > 5.10 (else do nothing):
  ``` json
  "scripts": {
    "build": "(if-ver -ge 4.3 && if-ver -lt 5) || if-ver -gt 5.10) && webpack || return 0"
  }
  ```

  Only run rollup if node version is >= 0.12 (else do nothing):
  ``` json
  "scripts": {
    "build": "if-ver -ge 0.12 && rollup -c || return 0"
  }
  ```
