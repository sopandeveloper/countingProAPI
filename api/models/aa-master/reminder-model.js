const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
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
    is_enable: {
        type: Boolean,
        required: [true, 'showing status is required.'],
        unique: true
    },
    is_premium: {
        type: Boolean,
        required: [true, 'premium feild is required.'],
    },
    reminder_type: {
        type: Array,
        required: [true, 'reminder type is required.']
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const Reminder = mongoose.model('Reminder', reminderSchema);
module.exports = Reminder;
