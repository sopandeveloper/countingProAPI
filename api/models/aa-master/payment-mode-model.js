const mongoose = require('mongoose');

const paymentModeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'payment mode is required.'],
        unique: true 
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    },
    is_cash: {
        type: Boolean,
        required: [true, 'status is required.']
    },
    is_online: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const PaymentMode = mongoose.model('PaymentMode', paymentModeSchema);

module.exports = PaymentMode;
