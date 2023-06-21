const mongoose = require('mongoose');

const itemTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Item type is required.'],
        unique: true,
        trim: true
    },
    is_product: {
        type: Boolean,
        required: [true, 'type is required.']
    },
    is_service: {
        type: Boolean,
        required: [true, 'type is required.']
    },
     is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const ItemType = mongoose.model('ItemType', itemTypeSchema);

module.exports = ItemType;
