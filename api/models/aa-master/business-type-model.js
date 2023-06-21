const mongoose = require('mongoose');

const businessTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Bussiness type is required.'],
        unique: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const BusinessType = mongoose.model('BusinessType', businessTypeSchema);

module.exports = BusinessType;
