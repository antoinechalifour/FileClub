'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';
var port = process.env.PORT = process.env.PORT || 3000;

var express = require('express');
var config = require('./config/express');
var routes = require('./routes');

var app = express();

config(app);
routes(app);

app.listen(app.get('port'), function(){
  console.log('Server running on port %d in %s mode.', port, env);
});
