const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        unique: true,
        trim: true
    },
    short_name: {
        type: String,
        required: [true, ' unit short name is required.'],
        unique: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
