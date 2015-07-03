'use strict';

module.exports = {
  port: 3000,
  jwt: {
    secret: 'dev-key',
    expires: '60'
  },
  db: {
    uri: 'mongodb://localhost/fileclub-dev'
  }
};
