'use strict';

var path = require('path');
var express = require('express');

module.exports = function(app){
  app.use('/auth', require('./auth/'));
  app.use('/api/fs', require('./api/fs/'));
  app.use('/api/users', require('./api/users/'));
  app.use('/download', require('./download/'));

  app.use(express.static(path.join(__dirname, '..', 'app')));
};
