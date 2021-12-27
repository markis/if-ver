#!/usr/bin/env node

function run() {
  try {
    if (isExecuting()) {
      var params = getParams();
      if (params && params.comparison && params.version) {
        process.exit(
          ifVersion(process.version, params.comparison, params.version) ? 0 : 1
        );
      } else {
        throw "No parameters specified";
      }
    }
  } catch (e) {
    process.stderr.write(e + "\n\n");
    printHelp();
  }
}

/**
 * Print usage message and exit
 */
function printHelp() {
  var fs = require("fs");
  var path = require("path");
  fs.readFile(
    path.resolve(__dirname, "./usage.txt"),
    "utf-8",
    function (err, contents) {
      process.stderr.write(contents + "\n");
      process.exit(0);
    }
  );
}

/**
 * Is the script executing or is this being 'required' into another script
 *
 * @returns {boolean}
 */
function isExecuting() {
  var scriptName = "/index.js";
  var binName = "/if-ver";
  var script = process.argv[1];
  return (
    (script &&
      script.substr(script.length - scriptName.length) === scriptName) ||
    script.substr(script.length - binName.length) === binName
  );
}

/**
 * @typedef {Object} Params - If-Ver Parameters
 * @property {string} comparison - Comparison operator - gt, eq, lt, etc.
 * @property {string} version - Semantic version - 4, 8.5.0, etc.
 */

/**
 * Check and convert process.argv into valid parameters
 *
 * @returns {Params}
 */
function getParams() {
  var args = process.argv;
  var params = {
    comparison: "",
    version: "",
  };

  if (args.length == 4) {
    params.comparison = args[2];
    params.version = args[3];
  }

  return params;
}

/**
 * Using the comparison operator, compare two versions
 *
 * @param {string} comparison
 * @param {string} versionA
 * @param {string} versionB
 */
function ifVersion(versionA, comparison, versionB) {
  var verA = getVersion(versionA);
  var verB = getVersion(versionB);

  if (!verA) {
    throw '"' + verA + '" is not a valid semver version';
  }
  if (!verB) {
    throw '"' + verB + '" is not a valid semver version';
  }

  switch (comparison) {
    case "-eq":
      return equalTo(verA, verB);
    case "-ne":
      return equalTo(verA, verB) === false;
    case "-gt":
      return greaterThan(verA, verB);
    case "-ge":
      return equalTo(verA, verB) || greaterThan(verA, verB);
    case "-lt":
      return lessThan(verA, verB);
    case "-le":
      return equalTo(verA, verB) || lessThan(verA, verB);
  }

  throw 'Invalid comparison operator "' + comparison + '"';
}

/**
 * @typedef {Object} SemVer - Semantic Version (https://semver.org)
 * @property {number} major - version with incompatible api changes
 * @property {number} minor - version with new functionality but backwards compatible
 * @property {number} patch - version with backwards-compatible bug fixes
 */

/**
 * Given a semver string return an object with the major, minor and patch broken out
 *
 * @param {string} version
 * @returns {SemVer}
 */
function getVersion(version) {
  var versionRegex = /^v?([\d]+)\.?([\d]+)?\.?([\d]+)?/;
  var matches = versionRegex.exec(version);
  if (matches && matches.length === 4) {
    /** @type SemVer */
    var versionObj = {};
    versionObj.major = parseInt(matches[1], 10) || 0;
    versionObj.minor = parseInt(matches[2], 10) || 0;
    versionObj.patch = parseInt(matches[3], 10) || 0;
    return versionObj;
  }
  return null;
}

/**
 * Is Version A equal to Version B
 *
 * @param {SemVer} a
 * @param {SemVer} b
 */
function equalTo(a, b) {
  return a.major === b.major && b.minor === b.minor && a.patch === b.patch;
}

/**
 * Is Version A greater than Version B
 *
 * @param {SemVer} a
 * @param {SemVer} b
 */
function greaterThan(a, b) {
  return (
    a.major > b.major ||
    (a.major === b.major && a.minor > b.minor) ||
    (a.major === b.major && a.minor === b.minor && a.patch > b.patch)
  );
}

/**
 * Is Version A less than Version B
 *
 * @param {SemVer} a
 * @param {SemVer} b
 */
function lessThan(a, b) {
  return (
    a.major < b.major ||
    (a.major === b.major && a.minor < b.minor) ||
    (a.major === b.major && a.minor === b.minor && a.patch < b.patch)
  );
}

run();

module.exports = {
  ifVersion: ifVersion,
  run: run,
};
