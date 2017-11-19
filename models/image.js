'use strict';

var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
    name: {type: String, required: false},
    createdAt: {type: Date, required: true},
    chunkWidth: {type: Number, required: true},
    chunkHeight: {type: Number, required: true},
    chunks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chunk'}]
}, {
    collection: 'images'
});

imageSchema.pre('validate', function (next) {
   if (this.isNew) {
       this.createdAt = new Date();
   }

   next();
});

var Image = mongoose.model('Image', imageSchema);
module.exports = Image;