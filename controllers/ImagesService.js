'use strict';

exports.addImage = function(args, res, next) {
  /**
   * Insert new image
   * 
   *
   * body Image Image data for new item
   * returns ImageInsertElement
   **/
  var examples = {};
  examples['application/json'] = {
  "chunkHeight" : 480,
  "chunkWidth" : 640,
  "name" : "Sample image"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getImageById = function(args, res, next) {
  /**
   * Find image by id
   * Returns a single image info with chunks ids
   *
   * id String ID of image to return
   * returns Image
   **/
  var examples = {};
  examples['application/json'] = {
  "createdAt" : "2016-08-29T09:12:33.001Z",
  "chunksCount" : 15,
  "chunkHeight" : 480,
  "chunkWidth" : 640,
  "chunks" : [ {
    "index" : 43,
    "id" : "58a336a28c936621c8c7e0dc",
    "mimeType" : "image/png"
  } ],
  "name" : "Sample image",
  "id" : "58a336a28c936621c8c7e0dc"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getImages = function(args, res, next) {
  /**
   * Searches images
   * By passing in the appropriate options, you can search for available images in the system 
   *
   * skip Integer number of records to skip for pagination (optional)
   * limit Integer maximum number of records to return (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "createdAt" : "2016-08-29T09:12:33.001Z",
  "chunksCount" : 15,
  "chunkHeight" : 480,
  "chunkWidth" : 640,
  "chunks" : [ {
    "index" : 43,
    "id" : "58a336a28c936621c8c7e0dc",
    "mimeType" : "image/png"
  } ],
  "name" : "Sample image",
  "id" : "58a336a28c936621c8c7e0dc"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

