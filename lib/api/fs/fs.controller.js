'use strict';

var fs = require('fs');
var path = require('path');

function dirTree(filename){
  var stats = fs.lstatSync(filename);
  var info = {
    name: path.basename(filename),
    stats: stats
  };

  if(stats.isDirectory()){
    info.type = 'directory';
    info.content = fs.readdirSync(filename)
      .map(function(child){
        return dirTree(path.join(filename, child));
      });
  }
  else {
    info.type = 'file';
  }

  return info;
}

function getAll(req, res, next){
  var username = req.user.username;
  var sharedContentPath = '/home/' + username + '/.fileclub';

  var sharedContent = dirTree(sharedContentPath);

  res.json(sharedContent.content);
}

module.exports.getAll = getAll;
