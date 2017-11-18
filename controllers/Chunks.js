'use strict';

var url = require('url');

var Chunks = require('./ChunksService');

module.exports.addChunk = function addChunk (req, res, next) {
  Chunks.addChunk(req.swagger.params, res, next);
};

module.exports.getChunkById = function getChunkById (req, res, next) {
  Chunks.getChunkById(req.swagger.params, res, next);
};
