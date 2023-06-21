const mongoose = require('mongoose');

const reminderTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Item type is required.'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        unique: true
    },
    icon: {
        type: String,
        required: [true, 'Icon is required.'],
        unique: true
    },
    is_premium: {
        type: Boolean,
        required: [true, 'premium feild is required.'],
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const reminderType = mongoose.model('reminderType', reminderTypeSchema);
module.exports = reminderType;
