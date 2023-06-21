const mongoose = require('mongoose');

const transactionCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Item type is required.'],
        unique: true 
    },
    
    serial_number:{
        type:Number,
        required: [true, 'serial number is required.'],
        unique: true 
    },
 
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const TransactionCategory = mongoose.model('TransactionCategory', transactionCategorySchema);
module.exports = TransactionCategory;
