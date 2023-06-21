const mongoose = require('mongoose');

const bankTransactionTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'account name is required.'],
    } ,
    is_active: {
        type: Boolean,
        required: [true, 'status is required.'],
    } 
});

const BankTransactionType = mongoose.model('BankTransactionType', bankTransactionTypeSchema);

module.exports = BankTransactionType;
