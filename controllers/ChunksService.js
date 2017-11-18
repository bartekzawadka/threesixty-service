'use strict';

exports.addChunk = function(args, res, next) {
  /**
   * Add chunk to image
   * Insert new chunk of specified image
   *
   * body Chunk Chunk object data to be added to specified image
   * id String ID of existing image
   * returns Chunk
   **/
  var examples = {};
  examples['application/json'] = {
  "data" : "SWRlYWx5IHNhIGphayBnd2l...",
  "index" : 43,
  "id" : "58a336a28c936621c8c7e0dc",
  "mimeType" : "image/png"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getChunkById = function(args, res, next) {
  /**
   * Find chunk by id
   * Returns a single chunk of 360 image by ID
   *
   * id String ID of image chunk to return
   * returns Chunk
   **/
  var examples = {};
  examples['application/json'] = {
  "data" : "SWRlYWx5IHNhIGphayBnd2l...",
  "index" : 43,
  "id" : "58a336a28c936621c8c7e0dc",
  "mimeType" : "image/png"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

