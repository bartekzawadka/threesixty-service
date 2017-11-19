'use strict';
var path = require('path');
var Images = require(path.join(__dirname, '..', 'models', 'image'));
var utils = require(path.join(__dirname, 'utils'));

exports.addImage = function(req, res) {
  /**
   * Insert new image
   * 
   *
   * body Image Image data for new item
   * returns ImageInsertElement
   **/

    if (!req.body) {
      utils.sendError(res, 400, "Invalid request. Empty data received");
      return;
    }

    if(!req.body.originalValue.chunkWidth || !req.body.originalValue.chunkHeight) {
        utils.sendError(res, 400, "Chunk width or height was not specified but is required");
        return;
    }

    var item = {
      name: req.body.originalValue.name,
      chunkWidth: req.body.originalValue.chunkWidth,
      chunkHeight: req.body.originalValue.chunkHeight
    };

    Images.create(item, function(error, image) {
        if (error) {
            utils.sendError(res, 400, error);
            return;
        }

        var result = {
          createdAt: image.createdAt,
          id: image._id,
          chunkWidth: image.chunkWidth,
          chunkHeight: image.chunkHeight,
          chunks: image.chunks,
          name: image.name
        };

        utils.sendJson(res, result);
    });
};

exports.getImageById = function(req, res) {
  /**
   * Find image by id
   * Returns a single image info with chunks ids
   *
   * id String ID of image to return
   * returns Image
   **/
    if(!req.id || !req.id.value) {
      utils.sendError(res, 400, "Image ID was not specified");
      return;
    }

    Images.findById(req.id.value)
        .select('_id createdAt name chunkWidth chunkHeight chunks')
        .populate({
            path: 'Chunk',
            options: {
              select: {
                _id: 1,
                index: 1,
                mimeType: 1
              }
            }
        })
        .exec(function(error, item) {
            if (error) {
                utils.sendError(res, 400, error);
                return;
            }

            utils.sendJson(res, item);
        });
};

exports.getImages = function(req, res) {
  /**
   * Searches images
   * By passing in the appropriate options, you can search for available images in the system 
   *
   * skip Integer number of records to skip for pagination (optional)
   * limit Integer maximum number of records to return (optional)
   * returns List
   **/
    var skip = 0;
    var limit = 50;

    if (req.skip && req.skip.value && req.skip.value >= 0) {
      skip = req.skip.value;
    }

    if (req.limit && req.limit.value && req.limit.value >= 0){
      limit = req.limit.value;
    }

    Images.find().count(function(countError, count) {
      if(countError) {
        utils.sendError(res, 400, countError);
        return;
      }

      Images.find()
          .skip(skip)
          .limit(limit)
          .select('_id createdAt name chunkWidth chunkHeight chunks')
          .sort([['createdAt', 'descending']])
          .exec(function(error, data) {
        if (error) {
          utils.sendError(res, 400, error);
          return;
        }

        var result = {
          count: count,
          data: data
        };

        utils.sendJson(res, result);
      });
    });
};

