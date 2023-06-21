const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'account name is required.'],
    }, 
    number: {
        type: String 
    }, 
    ifsc: {
        type: String 
    }, 
    branch: {
        type: String 
    },
      balance: {
        type: Number 
    }, 
    opening_balance: {
        type: Number 
    }, 
    opening_balance_on_date: {
        type: Date 
    }, 
    holder: {
        type: String 
    }, 
    company_id: {
        type: String,
        required: [true, 'company is required.'],
    }, 
    is_cash_account: {
        type: Boolean,
        required: [true, 'type is required.'],
    }, 
    is_active: {
        type: Boolean ,
        required: [true, 'status is required.'],
    }, 

});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;
