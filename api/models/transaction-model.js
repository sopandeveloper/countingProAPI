const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    bill_type_id: {
        type: String
    },

    transaction_type_id: {
        type: String,
        required: [true, 'transaction type is required.'],
    },

    number: {
        type: Number,
        required: [true, 'number is required.'],
    },
    prefix: {
        type: String
    },

    date: {
        type: String,
        required: [true, 'date is required.'],
    },
    ref_number: {
        type: String
    },
    ref_date: {
        type: String
    },
    is_intrastate: {
        type: Boolean
    },

    discount_perc: {
        type: Number
    },

    discount_amt: {
        type: Number
    },

    taxable_amt: {
        type: Number
    },

    igst_amt: {
        type: Number
    },

    cgst_amt: {
        type: Number
    },

    sgst_amt: {
        type: Number
    },

    tax_amt: {
        type: Number
    },

    roundof_amt: {
        type: Number
    },

    additional_charges: {
        type: Array
    },

    total_amt: {
        type: Number
    },

    paid_amt: {
        type: Number
    },

    balance_amt: {
        type: Number
    },

    due_date: {
        type: String
    },

    payment_mode_id: {
        type: String,
        required: [true, 'payment mode is required.'],
    },

    party_id: {
        type: String
    },

    company_id: {
        type: String,
        required: [true, 'company is required.'],
    },

    creator_id: {
        type: String
    },

    note: {
        type: String
    },
    bank_id: {
        type: String
    },
    items: {
        type: Array
    },
    category_id: {
type: String
    },
    is_active: {
        type: Boolean,
        required: [true, 'name is required.'],
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
