const AddressType = require('../models/aa-master/address-type-model');
const GstRate = require('../models/aa-master/gst-rate-model');
const ItemType = require('../models/aa-master/item-type-model');
const PartyType = require('../models/aa-master/party-type-model');
const State = require('../models/aa-master/state-model');
const TransactionType = require('../models/aa-master/transaction-type-model');
const Unit = require('../models/aa-master/unit-model');
const BankAccount = require('../models/bank-account-model');
const Company = require('../models/company-model');
const ItemCategory = require('../models/item-category-model');
const PartyCategory = require('../models/party-category-model');
const Party = require('../models/party-model');
const Item = require('../models/item-model');
const BankTransactionType = require('../models/aa-master/bank-transaction-type-model');
const TransactionCategory = require('../models/aa-master/transaction-category-model');
const PaymentMode = require('../models/aa-master/payment-mode-model');
const ExpanseCategory = require('../models/expanse-category-model');
const Expanse = require('../models/expanse-model');
const Transaction = require('../models/transaction-model');

module.exports = {

    createCompany: async (req, res, next) => {
        const body = req.body;
        const company = new Company({
            name: body.name,
            mobile: body.mobile,
            state_id: body.state_id,
            state: body.state,
            state_code: body.state_code

        });
        await company.save().then(async result => {
            const bankAccount = new BankAccount({
                name: "Cash",
                balance: 0,
                company_id: result._id,
                is_cash_account: true,
                is_active: true
            });
            await bankAccount.save();

            return res.status(201).json({
                message: 'Company created successfully',
                data: result,
                status: 201
            });

        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    updateCompany: async (req, res, next) => {
        const body = req.body;
        await Company.updateOne({ _id: body._id }, body).then(result => {
            return res.status(200).json({
                message: 'Update successful.',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
            else
                res.status(400).json({ error: err });
        });
    },

    login: async (req, res) => {
        const { mobile } = req.body;
        var comp = await Company.find({ mobile: mobile })
        if (comp.length == 1) {
            res.status(200).json(
                        {
                            status: 200,
                            company: comp,
                        },
                    );
        } else {
           
            const company = new Company({
                mobile: mobile 
            });
            await company.save().then(async result => {
                const bankAccount = new BankAccount({
                    name: "Cash",
                    balance: 0,
                    company_id: result._id,
                    is_cash_account: true,
                    is_active: true
                });
                await bankAccount.save();

                return res.status(201).json({
                    message: 'Company created successfully',
                    data: result,
                    status: 201
                });

            }).catch(err => {
                if (err.code === 11000)
                    res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
                else if (err.name === 'ValidationError')
                    res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
            });
        }
        // await Company.find({ mobile: mobile }).then(async result => {
        //     res.status(200).json(
        //         {
        //             status: 200,
        //             company: result,
        //         },
        //     );
        // }).catch(err => {
        //     res.status(200).json({ data: err });
        // })
    },

    getAppData: async (req, res) => {
        const { company_id } = req.body;
        const partyType = await PartyType.find({ is_active: true }, { is_active: 0 })
        const state = await State.find({ is_active: true }, { is_active: 0 })
        const addressType = await AddressType.find({ is_active: true }, { is_active: 0 })
        const partyCategory = await PartyCategory.find({ company_id: company_id }, { company_id: 0 })
        const transactionType = await TransactionType.find()
        const transactionCategory = await TransactionCategory.find()
        const party = await Party.find({ company_id: company_id }, { company_id: 0, is_active: 0 }).sort({ $natural: -   1 })
        const itemType = await ItemType.find({}, { is_active: 0 })
        const itemCategory = await ItemCategory.find({ company_id: company_id }, { company_id: 0, is_active: 0 })
        const unit = await Unit.find({ is_active: true }, { is_active: 0 })
        const gstRate = await GstRate.find({ is_active: true }, { is_active: 0 })
        const bankAccount = await BankAccount.find({ company_id: company_id, is_active: true }, { _id: 1, name: 1, balance: 1, is_cash_account: 1 })
        const item = await Item.find({ company_id: company_id, is_active: true }, { company_id: 0, is_active: 0 }).sort({ $natural: -   1 })
        const bankTransactionType = await BankTransactionType.find({ is_active: true }, { is_active: 0 })
        const paymentMode = await PaymentMode.find({ is_active: true }, { is_active: 0 })
        const expanseCategory = await ExpanseCategory.find({ company_id: company_id, is_active: true }, { company_id: 0, is_active: 0 })
        const expanses = await Expanse.find({ company_id: company_id, is_active: true }, { is_active: 0 })
        const transaction = await Transaction.find({ company_id: company_id, is_active: true }, { is_active: 0 }).sort({ $natural: -1 })
        res.status(200).json(
            {
                status: 200,
                states: state,
                partyTypes: partyType,
                addressTypes: addressType,
                partyCategories: partyCategory,
                parties: party,
                transactionTypes: transactionType,
                transactionCategories: transactionCategory,
                itemTypes: itemType,
                itemCategories: itemCategory,
                units: unit,
                gstRates: gstRate,
                bankAccounts: bankAccount,
                items: item,
                bankTransactionTypes: bankTransactionType,
                paymentModes: paymentMode,
                expanseCategies: expanseCategory,
                expanses: expanses,
                transactions: transaction,
            }
        )
    },

    getActiveCompany: (req, res) => {
        Company.find({ is_active: true }, { is_active: 0 }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteCompany: async (req, res) => {
        const id = req.params.id;
        await Company.deleteOne({ _id: Object(id) }).then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send(`Document with id ${id} was deleted successfully`);
            } else {
                res.status(404).send(`Document with id ${id} not found`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    }
}

