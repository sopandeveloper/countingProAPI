const BillType = require('../../models/aa-master/bill-type-model');

module.exports = {

    createBillType: async (req, res, next) => {
        const body = req.body;
        const billType = new BillType({
            name: body.name,
            is_active: true
        });
        await billType.save().then(result => {
            return res.status(201).json({
                message: 'Bill type created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    createManyBillType: async (req, res, next) => {
        const body = req.body;
        BillType.insertMany(body).then(result => {
            return res.status(201).json({
                message: 'BillType created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    updateBillType: async (req, res, next) => {
        const body = req.body;
        await BillType.updateOne({ _id: body._id }, body).then(result => {
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

    getBillType: async (req, res) => {
        await BillType.find().then(result => {
            if (!result)
                return res.status(404).send('BillType not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActiveBillType: (req, res) => {
        BillType.find({ is_active: true }, { is_active: 0 }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteBillType: async (req, res) => {
        const id = req.params.id;
        await BillType.deleteOne({ _id: Object(id) }).then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send(`Document with id ${id} was deleted successfully`);
            } else {
                res.status(404).send(`Document with id ${id} not found`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteManyBillType: async (req, res) => {
        await BillType.deleteMany({}).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).send(`Document not found`);
            } else {
                res.status(200).send(`${result.deletedCount} documents were deleted`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteAllBillType: async (req, res) => {
        await BillType.deleteMany({}).then(result => {
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

