var assert = require("assert");
var ifVer = require("./index");

// happy paths
assert.ok(ifVer.ifVersion("0.4", "-eq", "0.4"), "0.4=0.4 failed");
assert.ok(ifVer.ifVersion("0.8", "-gt", "0.4"), "0.8>0.4 failed");
assert.ok(ifVer.ifVersion("0.4.1", "-gt", "0.4.0"), "0.4.1>0.4.0 failed");
assert.ok(ifVer.ifVersion("0.4", "-lt", "0.8"), "0.4<0.8 failed");
assert.ok(ifVer.ifVersion("0.4.0", "-lt", "0.4.1"), "0.4.0<0.4.1 failed");
assert.ok(ifVer.ifVersion("4", "-gt", "0.4"), "4=0.4 failed");
assert.ok(ifVer.ifVersion("4.1", "-lt", "4.10"), "4.1<4.10 failed");
assert.ok(ifVer.ifVersion("4.1", "-ge", "4.1"), "4.1>=4.1 failed");
assert.ok(ifVer.ifVersion("4.1", "-ge", "4.2"), "4.1>=4.2 failed");
assert.ok(ifVer.ifVersion("4.1", "-le", "4.1"), "4.1>=4.1 failed");
assert.ok(ifVer.ifVersion("4.1", "-le", "4.0"), "4.1>=4.0 failed");
assert.ok(ifVer.ifVersion("0.4.1", "-ge", "0.4.0"), "0.4.1>0.4.0 failed");
assert.ok(ifVer.ifVersion("0.4.0", "-le", "0.4.1"));
assert.ok(ifVer.ifVersion("0.4.0", "-ne", "0.4.1"), "0.4.0!=0.4.1 failed");

// failures
assert.throws(function () {
  ifVer.ifVersion("asdf", "-eq", "0.4");
}, "invalid semver version did not throw an error");
assert.throws(function () {
  ifVer.ifVersion("0.4", "asdf", "0.4");
}, "invalid comparision operator did not throw an error");
assert.throws(function () {
  ifVer.ifVersion("0.4", "-eq", "asdf");
}, "invalid semver version did not throw an error");

// stub out the process methods and
// run code as though it was from the command line
// just to get complete code coverage

process.stderr.write = process.exit = function () {};

process.argv = ["", "./index.js", "-gt", "0.1"];
ifVer.run();

process.argv = ["", "./index.js", "-lt", "1000000"];
ifVer.run();

process.argv = ["", "./index.js", "-eq", "0.1"];
ifVer.run();

process.argv = ["", "./index.js"];
ifVer.run();

// if the script got here, then all tests passed
console.log("All tests pass");
