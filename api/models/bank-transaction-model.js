const mongoose = require('mongoose');

const bankTransactionSchema = new mongoose.Schema({
  
    date: {
        type: Date,
        required: [true, 'date is required.'],
    },
    amount: {
        type: Number,
        required: [true, 'amounts is required.'],
    },
    bank_transaction_type_id: {
        type: String,
        required: [true, 'trans id is required.'],
    },
    bank_transaction_type_name: {
        type: String,
        required: [true, 'trans name is required.'],
    },
    withdrawaler: {
        type: Object
    },
    depositor: {
        type: Object 
    } ,
    other: {
        type: Object
    }
});

const BankTransaction = mongoose.model('BankTransaction', bankTransactionSchema);

module.exports = BankTransaction;
