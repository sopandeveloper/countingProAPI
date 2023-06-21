const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/countingpro'
  
 const server_url = 'mongodb+srv://billing_user:pass1234@cluster0.de66c.mongodb.net/countingProPlus?retryWrites=true&w=majority';
  mongoose.connect(server_url, {
    useNewUrlParser: true
}).then(() => { 
    console.log('server database connected');
}).catch((err) => { 
    console.log(err)
})
 
require("./api/models/aa-master/state-model");
require("./api/models/aa-master/unit-model");
require("./api/models/aa-master/gst-rate-model");
require("./api/models/aa-master/industry-type-model");
require("./api/models/aa-master/business-type-model");
require("./api/models/aa-master/item-type-model");
require("./api/models/aa-master/designation-model");
require("./api/models/aa-master/bill-type-model");
require("./api/models/aa-master/reminder-type-model");
require("./api/models/aa-master/reminder-model");
require("./api/models/aa-master/transaction-category-model");
require("./api/models/aa-master/transaction-type-model");
require("./api/models/aa-master/report-category-model");
require("./api/models/aa-master/report-type-model");
require("./api/models/aa-master/party-type-model");
require("./api/models/aa-master/address-type-model");
require("./api/models/aa-master/bank-transaction-type-model");
require("./api/models/aa-master/payment-mode-model");

require("./api/models/staff-model");
require("./api/models/party-model");
require("./api/models/item-model");
require("./api/models/item-category-model");
require("./api/models/company-model");
require("./api/models/party-category-model");
require("./api/models/bank-account-model");
require("./api/models/bank-transaction-model");
require("./api/models/expanse-category-model");
require("./api/models/expanse-model");