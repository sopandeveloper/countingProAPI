const mongoose = require('mongoose');

const expanseSchema = new mongoose.Schema({
  
    number: {
        type: Number
    },
    prefix: {
        type: String
    },
    date: {
        type: Date
    },
    payment_mode_id: {
        type: String
    },
    bank_id: {
        type: String
    },
    items: {
        type: Array
    },
    total_amt: {
        type: Number
    },
    note: {
        type: String
    },
    category_id: {
        type: String
    },
    company_id: {
        type: String,
        required: [true, 'company is required.']
    },
    is_active: {
        type: Boolean
    }
});

const Expanse = mongoose.model('Expanse', expanseSchema);

module.exports = Expanse;
