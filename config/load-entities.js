const fs = require('fs');
const path = require('path');

const entitiesDir = path.join(__dirname, '../entities');

const entities = [];

entities.push(require(path.join(entitiesDir, 'book.js')));
entities.push(require(path.join(entitiesDir, 'genre.js')));
entities.push(require(path.join(entitiesDir, 'anime.js')));

module.exports = entities;
