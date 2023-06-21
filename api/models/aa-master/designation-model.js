const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Designation is required.'],
        unique: true,
        trim: true
    },
   
    is_active: {
        type: Boolean,
        required: [true, 'status is required.']
    },
    roles: {
        type: Array
    }
});

const Designation = mongoose.model('Designation', designationSchema);

module.exports = Designation;
