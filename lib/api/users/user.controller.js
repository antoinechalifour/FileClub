'use strict';

var isThere = require('is-there');
var mongoose = require('mongoose');
var User = mongoose.model('User');

/**
 * Returns information for the current user.
 */
function findCurrent(req, res, next){
  res.json(req.user);
}

/**
 * Checks whether a /home/<username>/ directory exists. If not, a 400 http-error
 * is returned to the client.
 */
function checkHomeDirectoryIsAvailable(req, res, next){
  console.log('[user::controller] checkHomeDirectoryIsAvailable()');
  var username = req.body.username;
  var password = req.body.password;

  if(!username){
    return next(new Error('Missing field'));
  }

  var homeExists = isThere('/home/' + username);

  if(!homeExists){
    var error = new Error('The user needs to be registered on the system.');
    error.status = 400;

    return next(error);
  }

  next();
}

/**
 * Checks whether the username is available. If not, a 400 http-error is
 * returned to the user.
 */
function checkUsernameIsAvailable(req, res, next){
  console.log('[user::controller] checkUsernameIsAvailable()');
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    username: username
  }, function(err, user){
    if(err){
      return next(err);
    }
    if(user){
      var error = new Error('User name is already registered');
      error.status = 400;
      return next(error);
    }

    next();
  });
}

/**
 * Saves the user to the database. It requires a username and a password in the
 * request body.
 */
function create(req, res, next){
  console.log('[user::controller] create() ');
  var username = req.body.username;
  var password = req.body.password;

  var user = new User({
    username: username,
    password: password
  });

  user.save(function(err, user){
    if(err){
      return next(err);
    }

    res.status(201)
    .json({
      status: 201,
      user: {
        username: user.username
      },
      links: [{
        rel: 'self',
        href: '/api/users/me',
        method: 'GET'
      }]
    });
  });
}

module.exports.findCurrent = findCurrent;
module.exports.checkHomeDirectoryIsAvailable = checkHomeDirectoryIsAvailable;
module.exports.checkUsernameIsAvailable = checkUsernameIsAvailable;
module.exports.create = create;
