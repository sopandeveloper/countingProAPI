const mongoose = require('mongoose');

const gstRate = new mongoose.Schema({
    rate: {
        type: Number,
        required: [true, 'GST rate is required.'],
        unique: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const GstRate = mongoose.model('GstRate', gstRate);

module.exports = GstRate;
 