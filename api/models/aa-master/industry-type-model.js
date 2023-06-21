const mongoose = require('mongoose');

const industryTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Industry type is required.'],
        unique: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const IndustryType = mongoose.model('IndustryType', industryTypeSchema);

module.exports = IndustryType;
