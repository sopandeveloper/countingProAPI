const mongoose = require('mongoose');

const addressTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'address type is required.'],
        unique: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const AddressType = mongoose.model('AddressType', addressTypeSchema);

module.exports = AddressType;
