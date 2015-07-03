'use strict';

var express = require('express');
var router = express.Router();

var controller = require('./fs.controller');
router.get('/', controller.getAll);

module.exports = router;
