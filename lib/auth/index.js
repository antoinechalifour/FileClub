'use strict';

var express = require('express');
var router = express.Router();

router.post('/local', require('./local/'));

module.exports = router;
