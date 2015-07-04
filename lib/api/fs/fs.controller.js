'use strict';

var fs = require('fs');
var path = require('path');
var isThere = require('is-there');

function extractInformation(filename){
  var stats = fs.lstatSync(filename);
  var infos = {};

  infos.name = path.basename(filename);

  if(stats.atime){
    infos.accessTime = stats.atime.getTime();
  }
  if(stats.mtime){
    infos.modificationTime = stats.mtime.getTime();
  }
  if(stats.ctime){
    infos.changeTime = stats.ctime.getTime();
  }
  if(stats.birthtime){
    infos.creationTime = stats.birthtime.getTime();
  }

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
  var userHome = req.user.home;
  var directory = req.directory;
  var dirInformation = extractInformation(directory);

  if(dirInformation.type === 'directory'){
    dirInformation.content = fs.readdirSync(directory)
      .map(function(childFile){
        var childPath = path.join(directory, childFile);
        var infos = extractInformation(childPath);
        var href = path.relative(userHome, childPath);

        infos.href = href;
        infos.links = [{
          rel: 'self',
          href: '/api/fs/?directory=' + href,
          method: 'GET'
        }, {
          rel: 'self',
          href: '/api/fs/?directory=' + href,
          method: 'DELETE'
        }, {
          rel: 'self',
          href: '/api/fs/?directory=' + href,
          method: 'PUT'
        }];

        if(infos.type === 'directory'){
          infos.links.push({
            rel: 'self',
            href: '/api/fs/?directory=' + href,
            method: 'POST'
          });
        }

        return infos;
      });
  }

  res.json(dirInformation);
}

module.exports.checkRequestedDirectoryExists = checkRequestedDirectoryExists;
module.exports.getDirectoryContent = getDirectoryContent;
