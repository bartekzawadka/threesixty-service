'use strict';
var path = require('path');
var Chunks = require(path.join(__dirname, '..', 'models', 'chunk'));
var Images = require(path.join(__dirname, '..', 'models', 'image'));
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
        index: args.body.originalValue.index,
        mimeType: args.body.originalValue.mimeType,
        data: args.body.originalValue.data
    };

    Images.findById(args.id.value, function(err, image){
        if (err) {
            utils.sendError(res, 400, err);
            return;
        }

        if(!image){
            utils.sendError(res, 400, "Could not find image by specified ID");
            return;
        }

        Chunks.create(item, function(error, chunk) {
            if (error) {
                utils.sendError(res, 405, error);
                return;
            }

            image.chunks.push(chunk._id);
            image.save();

            var result = {
                id: chunk._id,
                mimeType: chunk.mimeType,
                index: chunk.index,
                data: chunk.data
            };

            utils.sendJson(res, result);
        });
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

    Chunks.findById(args.id.value)
        .select('_id index mimeType data').exec(function (error, item) {
        if (error) {
            utils.sendError(res, 400, error);
            return;
        }

        if(!item) {
            utils.sendError(res, 404, "Could not find chunk by specified ID");
            return;
        }

        var result = {
            id: item._id,
            index: item.index,
            mimeType: item.mimeType,
            data: item.data
        };

        utils.sendJson(res, result);
    });
};

