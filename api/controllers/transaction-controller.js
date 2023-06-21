const BankTransaction = require('../models/bank-transaction-model');
const Transaction = require('../models/transaction-model');
const Party = require('../models/party-model');
const BankAccount = require('../models/bank-account-model');
const Item = require('../models/item-model')
module.exports = {

    createTransaction: async (req, res, next) => {
        const body = req.body;

        const tra = new Transaction({
            bill_type_id: body.bill_type_id,
            transaction_type_id: body.transaction_type_id,
            number: body.number,
            prefix: body.prefix,
            date: body.date,
            ref_number: body.ref_number,
            ref_date: body.ref_date,
            is_intrastate: body.is_intrastate,
            discount_perc: body.discount_perc,
            discount_amt: body.discount_amt,
            taxable_amt: body.taxable_amt,
            igst_amt: body.igst_amt,
            cgst_amt: body.cgst_amt,
            sgst_amt: body.sgst_amt,
            tax_amt: body.tax_amt,
            roundof_amt: body.roundof_amt,
            additional_charges: body.additional_charges,
            total_amt: body.total_amt,
            paid_amt: body.paid_amt,
            balance_amt: body.balance_amt,
            due_date: body.due_date,
            payment_mode_id: body.payment_mode_id,
            party_id: body.party_id,
            company_id: body.company_id,
            creator_id: body.creator_id,
            note: body.note,
            bank_id: body.bank_id,
            items: body.items,
            category_id: body.category_id,
            is_active: true
        });

        await tra.save().then(async result => {

            // update party  for payment out
            if (req.body.impactOn.party) {
                await Party.updateOne({ _id: body.party_id }, { $inc: { outstanding: req.body.trans_temp_values.party_amount } }).then(result => {
                    console.log(result)
                }).catch(err => {
                    console.log(err)
                })
            }
            // update bank account  for payment out
            if (req.body.impactOn.company_bank) {
                await BankAccount.updateOne({ _id: body.bank_id }, { $inc: { balance: req.body.trans_temp_values.bank_amount } }).then(result => {
                    console.log(result)
                }).catch(err => {
                    console.log(err)
                });

            }

            if (req.body.impactOn.item) {

                body.items.forEach(async element => {
                    await Item.updateOne({ _id: element.item_id }, { $inc: { qty: element.qty } }).then(result => {
                        console.log(result)
                    }).catch(err => {
                        console.log(err)
                    });
                });

               

            }

            //create bank transaction

            // const bank = new BankTransaction({
            //     date: body.date,
            //     amount: body.total_amt,
            //     bank_transaction_type_id: body.bank_transaction_type_id,
            //     bank_transaction_type_name: body.bank_transaction_type_name,
            //     withdrawaler: body.withdrawaler,
            //     depositor: body.depositor,
            //     other: body.other
            // });
            // await bank.save();

            return res.status(201).json({
                message: 'created successfully',
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

    updateTransaction: async (req, res, next) => {
        const body = req.body;
        await Transaction.updateOne({ _id: body._id }, body).then(result => {
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

    getTransactionByCompany: async (req, res) => {
        const { company_id } = req.body;
        await Transaction.find({ is_active: true, company_id: company_id }, { is_active: 0, company_id: 0 }).then(result => {
            if (!result)
                return res.status(404).send('Transaction not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    deleteTransaction: async (req, res) => {
        const id = req.params.id;
        await Transaction.deleteOne({ _id: Object(id) }).then(result => {
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

