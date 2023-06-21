const AddressType = require('../../models/aa-master/address-type-model');

module.exports = {

    createAddressType: async (req, res, next) => {
        const body = req.body;
        const at = new AddressType({
            name: body.name,
            is_active: true
        });
        await at.save().then(result => {
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

    updateAddressType: async (req, res, next) => {
        const body = req.body;
        await AddressType.updateOne({ _id: body._id }, body).then(result => {
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

    getAddressType: async (req, res) => {
        await AddressType.find().then(result => {
            if (!result)
                return res.status(404).send('AddressType not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActiveAddressType: (req, res) => {
        AddressType.find({ is_active: true }, { is_active: 0 }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteAddressType: async (req, res) => {
        const id = req.params.id;
        await AddressType.deleteOne({ _id: Object(id) }).then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send(`Document with id ${id} was deleted successfully`);
            } else {
                res.status(404).send(`Document with id ${id} not found`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },


}

