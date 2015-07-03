'use strict';

var appSettings = require('./environment/');
var uri = appSettings.db.uri;

module.exports = function(mongoose){
  mongoose.connect(uri, function(err){
    if(err){
      return console.error('Unable to connect to mongo db');
    }

    console.log('Connected to db %s', uri);
  });
  require('../api/users/user.model');
};
