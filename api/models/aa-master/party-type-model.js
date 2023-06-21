const mongoose = require('mongoose');

const partyTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Party type is required.'],
        unique: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    }
});

const PartyType = mongoose.model('PartyType', partyTypeSchema);

module.exports = PartyType;
