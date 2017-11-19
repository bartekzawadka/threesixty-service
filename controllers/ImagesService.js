'use strict';
var path = require('path');
var models = require(path.join(__dirname, '..', 'models'));
var utils = require(path.join(__dirname, 'utils'));

exports.addImage = function (req, res) {
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

    if (!req.body.originalValue.chunkWidth || !req.body.originalValue.chunkHeight) {
        utils.sendError(res, 400, "Chunk width or height was not specified but is required");
        return;
    }

    var item = {
        name: req.body.originalValue.name,
        chunkWidth: req.body.originalValue.chunkWidth,
        chunkHeight: req.body.originalValue.chunkHeight
    };

    models.Image.create(item).then(function (image) {
        req.id = {
            value: image.id
        };
        exports.getImageById(req, res);
    }, function (error) {
        if (error) {
            utils.sendError(res, 400, error);
        }
    });
};

exports.getImageById = function (req, res) {
    /**
     * Find image by id
     * Returns a single image info with chunks ids
     *
     * id String ID of image to return
     * returns Image
     **/
    if (!req.id || !req.id.value) {
        utils.sendError(res, 400, "Image ID was not specified");
        return;
    }

    models.Image.findOne({
        where: {
            id: req.id.value
        },
        include: [{
            model: models.Chunk,
            attributes: ['index', 'id']
        }]
    }).then(function (item) {

        if (!item) {
            utils.sendError(res, 400, "Could not find image by specified ID");
            return;
        }

        utils.sendJson(res, item);
    }).catch(function (error) {
        if (error) {
            utils.sendError(res, 400, error);
        }
    });
};

exports.getImages = function (req, res) {
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

    if (req.limit && req.limit.value && req.limit.value >= 0) {
        limit = req.limit.value;
    }

    models.Image.findAll({
        offset: skip,
        limit: limit,
        order: [['createdAt', 'DESC']]
    }).then(function (data) {
        utils.sendJson(res, data);
    }).catch(function (error) {
        if (error) {
            utils.sendError(res, 400, error);
        }
    });
};

