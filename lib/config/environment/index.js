'use strict';

var _ = require('lodash');

// Non environment-specific settings
var commonSettings = {

};

// Imports environment-specific settings
var env = process.env.NODE_ENV;
var envSettings = require('./' + env);

module.exports = _.merge(commonSettings, envSettings);
