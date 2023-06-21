const mongoose = require('mongoose');

const partyCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required.'],
        unique: true
    },
    company_id: {
        type: String,
        required: [true, 'company is required.']
    }
});

const PartyCategory = mongoose.model('PartyCategory', partyCategorySchema);

module.exports = PartyCategory;
