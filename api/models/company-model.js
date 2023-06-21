const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String 
    }, 
    mobile: {
        type: String,
        required: [true, 'mobile is required.'],
    }, 
    state_id: {
        type: String 
    }, 
    state: {
        type: String 
    }, 
    state_code: {
        type: String 
    }, 

});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
