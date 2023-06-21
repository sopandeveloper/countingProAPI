const BankTransaction = require('../models/bank-transaction-model');
const BankAccount = require('../models/bank-account-model')
module.exports = {

    createBankTransaction: async (req, res, next) => {
        const body = req.body;
        const bank = new BankTransaction({
            date: body.date,
            amount: body.amount,
            bank_transaction_type_id: body.bank_transaction_type_id,
            bank_transaction_type_name: body.bank_transaction_type_name,
            withdrawaler: body.withdrawaler,
            depositor: body.depositor,
            other: body.other
        });
        await bank.save().then(async trans_result => {
            await BankAccount.updateOne({ _id: body.withdrawaler._id }, { $inc: { balance: -body.amount } }).then(async withr_result => {
                await BankAccount.updateOne({ _id: body.depositor._id }, { $inc: { balance: body.amount } }).then(depo_result => {
                    return res.status(201).json({
                        message: 'created successfully',
                        data:  trans_result,
                        status: 201
                    });
                })
            })
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    updateBankTransaction: async (req, res, next) => {
        const body = req.body;
        await BankTransaction.updateOne({ _id: body._id }, body).then(result => {
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

    get: async (req, res) => {
        const { bank_id } = req.body;
        await BankTransaction.find().then(result => {
            if (!result)
                return res.status(404).send('BankTransaction not found');
            else
                return res.status(200).json({ data: result, status: 200 });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getByBank: async (req, res) => {
        const { bank_id } = req.body;

        const query = { $or: [{ 'withdrawaler._id': bank_id }, { 'depositor._id': bank_id }, { 'other._id': bank_id }] }

        await BankTransaction.find(query).sort({ $natural: -1 }).then(result => {
            if (!result)
                return res.status(404).send('BankTransaction not found');
            else
                return res.status(200).json({ data: result, status: 200 });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getById: async (req, res) => {
        const { _id } = req.body;
        await BankTransaction.find({ is_active: true, _id: _id }, { is_active: 0, company_id: 0 }).then(result => {
            if (!result)
                return res.status(404).send('BankTransaction not found');
            else
                return res.status(200).json({ data: result, status: 200 });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    deleteBankTransaction: async (req, res) => {
        const id = req.params.id;
        await BankTransaction.deleteOne({ _id: Object(id) }).then(result => {
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

