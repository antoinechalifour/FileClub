'use strict';

var express = require('express');
var auth = require('../auth/auth.service');
var controller = require('./download.controller');

var router = express.Router();

router.get('/',
  auth.isAuthenticated,
  controller.checkFileExists,
  controller.download);

module.exports = router;
