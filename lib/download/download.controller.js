'use strict';

var fs = require('fs');
var path = require('path');
var isThere = require('is-there');

function checkFileExists(req, res, next){
  var userHome = req.user.home;
  var file = req.query.file;
  var filePath = path.join(userHome, file);

  var exists = isThere(filePath);
  if(exists){
    var stats = fs.lstatSync(filePath);
    if(stats.isFile()){
      req.filePath = filePath;
      return next();
    }
    else {
      var error = new Error('Cannot download directory');
      error.status = 400;
      return next(error);
    }
  }
  else {
    var error = new Error('Requested file does not exist');
    error.status = 400;
    return next(error);
  }
}

function download(req, res, next){
  var filePath = req.filePath;
  res.download(filePath);
}

module.exports.checkFileExists = checkFileExists
module.exports.download = download;
