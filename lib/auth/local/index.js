'use strict';

var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var appSettings = require('../../config/environment/');

var router = express.Router();
var User = mongoose.model('User');

/**
 * Tries to authenticate the user given a username and a password using a local
 * strategy. When the username or the password is not valid, a 403 htt-error
 * is returned to the client.
 */
function authenticate(req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  User.findOne(
    {
      username: username
    },
    function(err, user){
      if(err){
        console.error(err);
        return next(err);
      }
      else if(!user){
        var error = new Error('Invalid credentials');
        error.status = 403;
        return next(error);
      }

      user.authenticateLocal(password, function(err, isValid){
        if(err || !isValid){
          var error = new Error('Invalid credentials');
          error.status = 403;
          return next(error);
        }

        var token = jwt.sign({
          username: user.username
        }, appSettings.jwt.secret, {
          expiresInMinutes: appSettings.jwt.expires
        });

        return res.json({
          status: 200,
          token: token,
          links: [{
            rel: 'user',
            href: '/api/users/me',
            method: 'GET'
          }]
        });
      });
    }
  );
}

module.exports = authenticate;
