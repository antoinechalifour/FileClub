'use strict';

var bodyParser = require('body-parser');
var appSettings = require('./environment/');

module.exports = function(app){
  var port = appSettings.port;

  app.use(bodyParser.json());
  app.set('port', port);
};
