'use strict';
var path = require('path');
var models = require(path.join(__dirname, '..', 'models'));
var utils = require(path.join(__dirname, 'utils'));

exports.addChunk = function (args, res, next) {
    /**
     * Add chunk to image
     * Insert new chunk of specified image
     *
     * body Chunk Chunk object data to be added to specified image
     * id String ID of existing image
     * returns Chunk
     **/

    if (!args.body) {
        utils.sendError(res, 405, "Invalid request. Empty data received");
        return;
    }

    if (!args.id || !args.id.value) {
        utils.sendError(res, 400, "Invalid request. No image ID provided");
        return;
    }

    if (!args.body.originalValue) {
        utils.sendError(res, 405, "Invalid request. Invalid message body structure");
        return;
    }

    if (!args.body.originalValue.index) {
        utils.sendError(res, 405, "Invalid request. Chunk index is required");
        return;
    }

    if (!args.body.originalValue.data) {
        utils.sendError(res, 405, "Invalid request. Chunk data is required");
        return;
    }

    var item = {
        ImageId: args.id.value,
        index: args.body.originalValue.index,
        mimeType: args.body.originalValue.mimeType,
        data: args.body.originalValue.data
    };

    models.Image.findById(args.id.value).then(function(image){
            if(!image){
                utils.sendError(res, 400, "Could not find image by specified ID");
                return;
            }

            models.Chunk.create(item).then(function(chunk){

                var result = chunk;
                // result.data = undefined;

                utils.sendJson(res, result);
            }).catch(function(error){
                if (error) {
                    utils.sendError(res, 405, error);
                }
            });
    }).catch(function(err){
            if (err) {
                utils.sendError(res, 400, err);
            }
    });
};

exports.getChunkById = function (args, res) {
    /**
     * Find chunk by id
     * Returns a single chunk of 360 image by ID
     *
     * id String ID of image chunk to return
     * returns Chunk
     **/

    if (!args.id || !args.id.value) {
        utils.sendError(res, 400, "Image ID was not specified");
        return;
    }

    models.Chunk.findById(args.id.value).then(function(chunk){
        if(!chunk) {
            utils.sendError(res, 404, "Could not find chunk by specified ID");
            return;
        }

        utils.sendJson(res, chunk);
    }).catch(function(error){
        if (error) {
            utils.sendError(res, 400, error);
        }
    });
};

