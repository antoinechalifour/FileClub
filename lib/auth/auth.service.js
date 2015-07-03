'use strict';

var jwt = require('jsonwebtoken');
var appSettings = require('../config/environment/');

function isAuthenticated(req, res, next){
  var token = req.body.token || req.query.token || req.headers.Authorization;

  if(!token){
    var error = new Error('Missing token.');
    error.status = 403;
    return next(error);
  }

  jwt.verify(token, appSettings.secret, function(err, decodedToken){
      if(err){
        var error = new Error('Invalid token.');
        error.status = 403.
        return next(error);

        req.user = decodedToken;
        next();
      }
  });
}

module.exports.isAuthenticated = isAuthenticated;
