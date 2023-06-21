const mongoose = require('mongoose');

const expanseCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required.'] 
    },
    company_id: {
        type: String,
        required: [true, 'company is required.']
    },
    is_active: {
        type: Boolean
    }
});

const ExpanseCategory = mongoose.model('ExpanseCategory', expanseCategorySchema);

module.exports = ExpanseCategory;
