# if-ver - simple node version check

Usage: if-ver [comparison-operator] [semantic-version]

Check installed node version against a requested version using comparison operator. 
The main purpose of this script is make it easier to only run scripts if the version is correct.

Comparison operators:
  * -eq - is equal to
  * -ne - is not equal to
  * -gt - is greater than
  * -lt - is less than
  * -ge - is greater than or equal to
  * -le - is less than or equal to

Examples:

  Only run eslint if node version is at least 4:
  ``` bash
  if-ver -ge 4 && eslint *.js || return 0
  ```

  Only compile typescript if node version is at least 4.2:
  ``` bash
  if-ver -ge 4.2 && tsc || return 0
  ```

  Only run webpack if node version is (>= 4.3 && <5) || > 5.10:
  ``` bash
  (if-ver -ge 4.3 && if-ver -lt 5) || if-ver -gt 5.10) && webpack || return 0
  ```
