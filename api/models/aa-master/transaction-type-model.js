const mongoose = require('mongoose');

const transactionTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Item type is required.'],
        unique: true 
    },
    standard_name: {
        type: String,
        required: [true, 'standard name is required.']
    },
    serial_number:{
        type:Number,
        required: [true, 'serial number is required.'],
        unique: true 
    },
    icon: {
        type: String,
        required: [true, 'Icon is required.'],
    },
    url: {
        type: String,
        required: [true, 'Url is required.'],
    },
    is_premium: {
        type: Boolean,
        required: [true, 'premium feild is required.'],
    },
    transaction_category_id: {
        type: String,
        required: [true, 'transaction category is required.'],
    },
    is_active: {
        type: Boolean, 
        required: [true, 'status is required.']
    }
});

const TransactionType = mongoose.model('TransactionType', transactionTypeSchema);
module.exports = TransactionType;
