const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required.'],
    },
    contact_number: {
        type: String,
        required: [true, 'contact number is required.'],
    },

    gender: {
        type: String,
    },

    dob: {
        type: Date,
    },
    payout_type_id: {
        type: String,
        required: [true, ' payout type is required.'],
    },

    salary: {
        type: Number,
        required: [true, 'salary is required.'],
    },

    outstanding: {
        type: Number,
    },

    designation_id: {
        type: String,
        required: [true, 'designation is required.'],
    },

    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
