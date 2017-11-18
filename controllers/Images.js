'use strict';

var url = require('url');

var Images = require('./ImagesService');

module.exports.addImage = function addImage (req, res, next) {
  Images.addImage(req.swagger.params, res, next);
};

module.exports.getImageById = function getImageById (req, res, next) {
  Images.getImageById(req.swagger.params, res, next);
};

module.exports.getImages = function getImages (req, res, next) {
  Images.getImages(req.swagger.params, res, next);
};
