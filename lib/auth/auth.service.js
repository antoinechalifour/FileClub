'use strict';

var path = require('path');
var jwt = require('jsonwebtoken');
var appSettings = require('../config/environment/');

/**
 * Authenticate the user for the given token. Token can be sent in the header,
 * body, or querystring.
 * When the token is not valid, a 403 http-error is returned to the client.
 */
function isAuthenticated(req, res, next){
  var token = req.body.token || req.query.token || req.headers.authorization;

  if(!token){
    var error = new Error('Missing token.');
    error.status = 403;
    return next(error);
  }

  jwt.verify(token, appSettings.jwt.secret, function(err, decodedToken){
      if(err){
        var error = new Error('Invalid token.');
        error.status = 403.
        return next(error);
      }

      var username = decodedToken.username;
      req.decodedToken = decodedToken;
      req.user = {
        username: username,
        home: path.join('/home', username, 'fileclub')
      };
      next();
  });
}

module.exports.isAuthenticated = isAuthenticated;
