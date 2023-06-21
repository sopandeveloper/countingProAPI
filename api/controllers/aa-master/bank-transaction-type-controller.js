const BankTransactionType = require('../../models/aa-master/bank-transaction-type-model');

module.exports = {

    createBankTransactionType: async (req, res, next) => {
        const body = req.body;
        const banktt = new BankTransactionType({
            name: body.name,
            is_active:true
        });
        await banktt.save().then(result => {
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

    updateBankTransactionType: async (req, res, next) => {
        const body = req.body;
        await BankTransactionType.updateOne({ _id: body._id }, body).then(result => {
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

    getBankTransactionType: async (req, res) => {
        
        await BankTransactionType.find().then(result => {
            if (!result)
                return res.status(404).send('BankTransactionType not found');
            else
                return res.status(200).json({ data: result, status: 200 });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActiveBankTransactionType: async (req, res) => {
        await BankTransactionType.find({ is_active: true }).then(result => {
            if (!result)
                return res.status(404).send('BankTransactionType not found');
            else
                return res.status(200).json({ data: result, status: 200 });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    deleteBankTransactionType: async (req, res) => {
        const id = req.params.id;
        await BankTransactionType.deleteOne({ _id: Object(id) }).then(result => {
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

