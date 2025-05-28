const path = require('path');
const app = require('../app');

const dbConfig = {
    "type": "sqlite",
    "database": "../infrastructure/database/DBApp.db",
    "synchronize": false,
    "logging": true,
    "entities": [path.join(__dirname , "../entities/*.js")],
    "migrations": [path.join(__dirname , "../migration/*.js")]
  }

module.exports = dbConfig;