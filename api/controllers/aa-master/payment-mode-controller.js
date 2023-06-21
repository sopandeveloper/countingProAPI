const PaymentMode = require('../../models/aa-master/payment-mode-model');

module.exports = {

    createPaymentMode: async (req, res, next) => {
        const body = req.body;
        const pm = new PaymentMode({
            name: body.name,
            is_cash: body.is_cash,
            is_online: body.is_online,
            is_active: true
        });
        await pm.save().then(result => {
            return res.status(201).json({
                message: 'payment mode created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },


    updatePaymentMode: async (req, res, next) => {
        const body = req.body;
        await PaymentMode.updateOne({ _id: body._id }, body).then(result => {
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

    getPaymentMode: async (req, res) => {
        await PaymentMode.find().then(result => {
            if (!result)
                return res.status(404).send('PaymentMode not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActivePaymentMode: (req, res) => {
        PaymentMode.find({ is_active: true }, { is_active: 0 }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deletePaymentMode: async (req, res) => {
        const id = req.params.id;
        await PaymentMode.deleteOne({ _id: Object(id) }).then(result => {
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

