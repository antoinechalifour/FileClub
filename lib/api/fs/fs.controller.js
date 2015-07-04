'use strict';

var fs = require('fs');
var path = require('path');
var isThere = require('is-there');

function extractInformation(filename){
  var stats = fs.lstatSync(filename);
  var infos = {
    name: path.basename(filename),
    stats: stats
  };

  if(stats.isDirectory()){
    infos.type = 'directory';
  }
  else {
    infos.type = 'file';
  }

  return infos;
}

function checkRequestedDirectoryExists(req, res, next){
  var username = req.user.username;
  var requestedDirectory = req.query.directory || '';
  var fullDirectoryPath = path.join('/home', username, 'fileclub', requestedDirectory);

  var exists = isThere(fullDirectoryPath);
  if(exists){
    req.directory = fullDirectoryPath;
    return next();
  }
  else {
    var error = new Error('Requested directory does not exist.');
    error.status = 400;
    return next(error);
  }
}

function getDirectoryContent(req, res, next){
  var directory = req.directory;
  var dirInformation = extractInformation(directory);

  if(dirInformation.type === 'directory'){
    dirInformation.content = fs.readdirSync(directory)
      .map(function(childFile){
        var childPath = path.join(directory, childFile);
        return extractInformation(childPath);
      });
  }

  res.json(dirInformation);
}

module.exports.checkRequestedDirectoryExists = checkRequestedDirectoryExists;
module.exports.getDirectoryContent = getDirectoryContent;
