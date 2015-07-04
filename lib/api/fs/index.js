'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./fs.controller');

var router = express.Router();

router.get('/',
  auth.isAuthenticated,
  controller.checkRequestedDirectoryExists,
  controller.getDirectoryContent);

module.exports = router;
