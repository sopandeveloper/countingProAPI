const mongoose = require('mongoose');

const reportCategorySchema = new mongoose.Schema({
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
        required: [true, 'premium feild is required.'],
    },
    label: {
        type: Array
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const reportCategory = mongoose.model('reportCategory', reportCategorySchema);
module.exports = reportCategory;
