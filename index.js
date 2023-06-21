require('./database');

const port = 7691;
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.json());
var cors = require('cors');
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(cors(corsOptions));
var corsOptions = {
    origin: ['*'],
    optionsSuccessStatus: 200
}

app.listen(port, () => {
    console.log('app running on port: ' + port)
})


// const { sendOTP }=require('./middleware/whatsapp');
// sendOTP.call();
app.get('/v1/countingpro/party/registration', (req, res) => {
    res.sendFile(__dirname + '/api/view/party-registration.html');
});
var version_code = '/v1/';

app.use(version_code + 'chatboat', require('./api/routers/chat-boat-router'));

app.use(version_code + 'state', require('./api/routers/aa-master/state-router'));
app.use(version_code + 'unit', require('./api/routers/aa-master/unit-router'));
app.use(version_code + 'gstrate', require('./api/routers/aa-master/gst-rate-router'));
app.use(version_code + 'industrytype', require('./api/routers/aa-master/industry-type-router'));
app.use(version_code + 'businesstype', require('./api/routers/aa-master/business-type-router'));
app.use(version_code + 'itemtype', require('./api/routers/aa-master/item-type-router'));
app.use(version_code + 'designation', require('./api/routers/aa-master/designation-router'));
app.use(version_code + 'billtype', require('./api/routers/aa-master/bill-type-router'));
app.use(version_code + 'remindertype', require('./api/routers/aa-master/reminder-type-router'));
app.use(version_code + 'reminder', require('./api/routers/aa-master/reminder-router'));
app.use(version_code + 'transactioncategory', require('./api/routers/aa-master/transaction-category-router'));
app.use(version_code + 'transactiontype', require('./api/routers/aa-master/transaction-type-router'));
app.use(version_code + 'reportcategory', require('./api/routers/aa-master/report-category-router'));
app.use(version_code + 'reporttype', require('./api/routers/aa-master/report-type-router'));
app.use(version_code + 'partytype', require('./api/routers/aa-master/party-type-router'));
app.use(version_code + 'addresstype', require('./api/routers/aa-master/address-type-router'));
app.use(version_code + 'banktransactiontype', require('./api/routers/aa-master/bank-transaction-type-router'));
app.use(version_code + 'paymentmode', require('./api/routers/aa-master/payment-mode-router'));

app.use(version_code + 'company', require('./api/routers/company-router'));
app.use(version_code + 'party', require('./api/routers/party-router'));
app.use(version_code + 'item', require('./api/routers/item-router'));
app.use(version_code + 'partycategory', require('./api/routers/party-category-router'));
app.use(version_code + 'itemcategory', require('./api/routers/item-category-router'));
app.use(version_code + 'transaction', require('./api/routers/transaction-router'));
app.use(version_code + 'bankaccount', require('./api/routers/bank-account-router'));
app.use(version_code + 'banktransaction', require('./api/routers/bank-transaction-router'));
app.use(version_code + 'expansecategory', require('./api/routers/expanse-category-router'));
app.use(version_code + 'expanse', require('./api/routers/expanse-router'));
