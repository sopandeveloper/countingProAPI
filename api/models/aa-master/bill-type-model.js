const mongoose = require('mongoose');

const billTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Bill type is required.'],
        unique: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const BillType = mongoose.model('BillType', billTypeSchema);

module.exports = BillType;
