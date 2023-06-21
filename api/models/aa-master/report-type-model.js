const mongoose = require('mongoose');

const reportTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Item type is required.'],
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    icon: {
        type: String,
        required: [true, 'Icon is required.'],
    },
    is_premium: {
        type: Boolean,
        required: [true, 'premium feild is required.']
    },
    url: {
        type: String,
        required: [true, 'url is required.'],
    },
    label: {
        type: Array,
    },
    report_category: {
        type: Array,
        required: [true, 'report category is required.']
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const reportType = mongoose.model('reportType', reportTypeSchema);
module.exports = reportType;
