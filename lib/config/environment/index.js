'use strict';

var _ = require('lodash');

var commonSettings = {

};

var env = process.env.NODE_ENV;
var envSettings = require('./' + env);

module.exports = _.merge(commonSettings, envSettings);
