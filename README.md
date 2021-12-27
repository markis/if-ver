# if-ver - simple node version check


[![node](https://img.shields.io/node/v/if-ver.svg)](https://www.npmjs.com/package/if-ver)
[![npm test](https://github.com/markis/if-ver/actions/workflows/test.yml/badge.svg)](https://github.com/markis/if-ver/actions/workflows/test.yml)

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

```bash
if-ver [comparison-operator] [semantic-version]
```

### package.json usage
```json
"scripts": {
  "test": "if-ver -gt 4 || exit 0; run-node-4-thing"
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
  ```json
  "scripts": {
    "lint": "if-ver -gt 4 || exit 0; eslint *.js"
  }
  ```

  Only compile typescript if node version is at least 4.2 (else do nothing):
  ```json
  "scripts": {
    "build": "if-ver -gt 4.2 || exit 0; tsc"
  }
  ```

  Only run webpack if node version is (>= 4.3 && <5) || > 5.10 (else do nothing):
  ```json
  "scripts": {
    "build": "(if-ver -ge 4.3 && if-ver -lt 5) || if-ver -gt 5.10 || exit 0; webpack"
  }
  ```

  Only run rollup if node version is >= 0.12 (else do nothing):
  ```json
  "scripts": {
    "build": "if-ver -ge 0.12 || exit 0; rollup -c"
  }
  ```
