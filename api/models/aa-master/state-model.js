const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        unique: true,
        trim: true
    },
    code: {
        type: String,
        required: [true, 'State code is required.'],
        minlength: [2, 'State code must be at least 2 digits.'],
        maxlength: [2, 'State code cannot exceed 2 digits.'],
        unique: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const State = mongoose.model('State', stateSchema);

module.exports = State;
