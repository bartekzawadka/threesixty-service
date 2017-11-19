'use strict';

var mongoose = require('mongoose');

var chunkSchema = mongoose.Schema({
    index: {type: Number, required: true},
    mimeType: {type: String, required: false},
    data: {type: String, required: true}
}, {
    collection: 'chunks'
});

var Chunk = mongoose.model('Chunk', chunkSchema);
module.exports = Chunk;