'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

var User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

User.pre('save', function(next){
  var user = this;

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if(err) { return next(err); }

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) { return next(err); }

      user.password = hash;
      return next();
    });
  });
});

User.methods.authenticateLocal = function(passwordToTest, cb){
  var user = this;

  bcrypt.compare(passwordToTest, user.hashedPassword, function(err, isMatch){
    if(err) { return cb(err); }
    return cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', User);
