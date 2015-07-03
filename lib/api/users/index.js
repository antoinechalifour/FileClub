'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

router.get('/me', controller.findCurrent);

router.post('/', controller.checkHomeDirectoryIsAvailable);
router.post('/', controller.checkUsernameIsAvailable)
router.post('/', controller.create);

module.exports = router;
