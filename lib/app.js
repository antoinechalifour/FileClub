'use strict';

// Setting default environment
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || 3000;

var express = require('express');
var mongoose = require('mongoose');
var expressConfig = require('./config/express');
var mongooseConfig = require('./config/mongoose');
var routes = require('./routes');

var app = express();

// Connects to mongodb and loads models.
mongooseConfig(mongoose);

// Sets plugins, port,...
expressConfig(app);

// Adds routes.
routes(app);

// Error handling.
app.use(function(err, req, res, next){
  var status = err.status || 500;
  var message = err.message || 'Internal server error';

  if(status == 500){
    console.error(err);
  }

  res.status(status)
  .json({
    status: status,
    message: message
  });
});

var port = app.get('port');
app.listen(port, function(){
  console.log('Server running on port %d in %s mode.', port, env);
});
