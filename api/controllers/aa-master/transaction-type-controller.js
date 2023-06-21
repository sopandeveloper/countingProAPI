const TransactionType = require('../../models/aa-master/transaction-type-model');

module.exports = {

    createTransactionType: async (req, res, next) => {
        const body = req.body;
        const transactionType = new TransactionType({
            name: body.name,
            standard_name: body.standard_name,
            serial_number: body.serial_number,
            icon: body.icon,
            url: body.url,
            is_premium: body.is_premium,
            transaction_category_id: body.transaction_category_id,
            is_active: true
        });
        await transactionType.save().then(result => {
            return res.status(201).json({
                message: 'Transaction type type created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    createManyTransactionType: async (req, res, next) => {
        const body = req.body;
        TransactionType.insertMany(body).then(result => {
            return res.status(201).json({
                message: 'TransactionType created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    updateTransactionType: async (req, res, next) => {
        const body = req.body;
        await TransactionType.updateOne({ _id: body._id }, body).then(result => {
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

    getTransactionType: async (req, res) => {
        await TransactionType.find().then(result => {
            if (!result)
                return res.status(404).send('TransactionType not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActiveTransactionType: (req, res) => {
        TransactionType.find({ is_active: true }, { is_active: 0 }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteTransactionType: async (req, res) => {
        const id = req.params.id;
        await TransactionType.deleteOne({ _id: Object(id) }).then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send(`Document with id ${id} was deleted successfully`);
            } else {
                res.status(404).send(`Document with id ${id} not found`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteManyTransactionType: async (req, res) => {
        await TransactionType.deleteMany({}).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).send(`Document not found`);
            } else {
                res.status(200).send(`${result.deletedCount} documents were deleted`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteAllTransactionType: async (req, res) => {
        await TransactionType.deleteMany({}).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).send(`Document not found`);
            } else {
                res.status(200).send(`${result.deletedCount} documents were deleted`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    }
}

