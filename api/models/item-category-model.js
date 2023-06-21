const mongoose = require('mongoose');

const itemCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required.'] 
    },
    company_id: {
        type: String,
        required: [true, 'company is required.']
    }
});

const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema);

module.exports = ItemCategory;
