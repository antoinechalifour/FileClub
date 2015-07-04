'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./user.controller');

var router = express.Router();

// Gets the current user information
router.get('/me',
  auth.isAuthenticated,
  controller.findCurrent);

// Registration
router.post('/',
  controller.checkHomeDirectoryIsAvailable,
  controller.checkUsernameIsAvailable,
  controller.create);

module.exports = router;
