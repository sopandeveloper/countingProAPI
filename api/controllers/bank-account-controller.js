const BankAccount = require('../models/bank-account-model');
const BankTransaction = require('../models/bank-transaction-model');

module.exports = {

    createBankAccount: async (req, res, next) => {
        const body = req.body;
        const bank = new BankAccount({

            name: body.name,
            number: body.number,
            ifsc: body.ifsc,
            branch: body.branch,
            balance: body.balance,
            opening_balance: body.opening_balance,
            opening_balance_on_date: body.opening_balance_on_date,
            holder: body.holder,
            company_id: body.company_id,
            is_cash_account: false,
            is_active: true

        });

        await bank.save().then(async result => {
            
            if (body.opening_balance > 0) {
                other = {
                    _id: result._id,
                    name: body.name,
                    amount: body.opening_balance,
                    current_balance: body.balance,
                    remark: "Opening Balance"
                }
                const banktra = new BankTransaction({
                    date: body.opening_balance_on_date,
                    amount: body.opening_balance,
                    bank_transaction_type_id: 'none',
                    bank_transaction_type_name: "Opening Balance",
                    withdrawaler: [],
                    depositor: [],
                    other: other
                });
                console.log(banktra)
                await banktra.save().then(result1 => {
                    return res.status(201).json({
                        message: 'created successfully',
                        data: result,
                        data1: result1,
                        status: 201
                    });
                }).catch(err => {
                    if (err.code === 11000)
                        res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
                    else if (err.name === 'ValidationError')
                        res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
                });
            } else {
                return res.status(201).json({
                    message: 'created successfully',
                    data: result,
                    status: 201
                });

            }






        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    updateBankAccount: async (req, res, next) => {
        const body = req.body;
        await BankAccount.updateOne({ _id: body._id }, body).then(result => {
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

    getBankAccountByCompany: async (req, res) => {
        const { company_id } = req.body;
        await BankAccount.find({ is_active: true, company_id: company_id }, { is_active: 0, company_id: 0 }).then(result => {
            if (!result)
                return res.status(404).send('BankAccount not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getById: async (req, res) => {
        const { _id } = req.body;
        await BankAccount.find({ is_active: true, _id: _id }, { is_active: 0, company_id: 0 }).then(result => {
            if (!result)
                return res.status(404).send('BankAccount not found');
            else
                return res.status(200).json({ data: result, status: 200 });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    deleteBankAccount: async (req, res) => {
        const id = req.params.id;
        await BankAccount.deleteOne({ _id: Object(id) }).then(result => {
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

