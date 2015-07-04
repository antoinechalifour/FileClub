'use strict';

module.exports = function(app){
  app.use('/auth', require('./auth/'));
  app.use('/api/fs', require('./api/fs/'));
  app.use('/api/users', require('./api/users/'));
  app.use('/download', require('./download/'));
};
