const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is required.'],
    },
    contact_number: {
        type: String,
        required: [true, 'contact number is required.'],
    },
    alt_contact_number: {
        type: String,

    },
    dob: {
        type: Date,

    },
    email: {
        type: String,

    },
    gst_number: {
        type: String,

    },
    gst_type: {
        type: String,

    },
    pan_number: {
        type: String,

    },

    opening_balance: {
        type: Number
    },
    
    is_opening_balance_pay: {
        type: Boolean
    },

    outstanding: {
        type: Number,

    },
    credit_period_days: {
        type: Number,

    },
    credit_limit: {
        type: Number,

    },
    category_id: {
        type: String,

    },
    rating: {
        type: Number,

    },
    type_id: {
        type: String,
        required: [true, 'party type is required.'],
    },

    addresses: {
        type: Object
    },
    creator: {
        type: Array,
        required: [true, 'creator is required.'],
    },

    is_active: {
        type: Boolean,
        required: [true, 'status is required.'],
    },
    company_id: {
        type: String,
        required: [true, 'company is required.'],

    }

});

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
