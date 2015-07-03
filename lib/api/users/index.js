'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./user.controller');

var router = express.Router();

router.get('/me', auth.isAuthenticated, controller.findCurrent);

router.post('/', controller.checkHomeDirectoryIsAvailable);
router.post('/', controller.checkUsernameIsAvailable)
router.post('/', controller.create);

module.exports = router;
