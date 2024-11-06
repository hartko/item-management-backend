'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true

    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
        min: [0, 'Quantity cannot be negative']
    },
}, { timestamps: true });
itemSchema.plugin(require('mongoose-paginate-v2'));
module.exports = mongoose.model('item', itemSchema);
