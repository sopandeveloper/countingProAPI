const Party = require('../models/party-model');
module.exports = {

    createParty: async (req, res, next) => {
        const body = req.body;
        const party = new Party({
            name: body.name,
            contact_number: body.contact_number,
            alt_contact_number: body.alt_contact_number,
            dob: body.dob,
            email: body.email,
            gst_number: body.gst_number,
            gst_type: body.gst_type,
            pan_number: body.pan_number,
            opening_balance: body.opening_balance,
            is_opening_balance_pay:body.is_opening_balance_pay,
            outstanding: body.outstanding,
            credit_period_days: body.credit_period_days,
            credit_limit: body.credit_limit,
            category_id: body.category_id,
            rating: body.rating,
            type_id: body.type_id,
            addresses: body.addresses,
            is_active: body.is_active,
            creator: body.creator,
            is_active: true,
            company_id: body.company_id
        });
        await party.save().then(result => {
            return res.status(201).json({
                message: 'Party created successfully',
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

    createManyParty: async (req, res, next) => {
        const body = req.body;
        Party.insertMany(body).then(result => {
            return res.status(201).json({
                message: 'Party created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    updateParty: async (req, res, next) => {
        const body = req.body;
        await Party.updateOne({ _id: body._id }, body).then(result => {
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

    getPartyByCompId: async (req, res) => {
        const { company_id } = req.body;
        await Party.find({company_id: company_id, is_active: true}, {is_active: 0}).then(result => {
            if (!result)
                return res.status(404).send({ message:'Party not found', status: 404});
            else
                return res.status(200).json({ data: result, status: 200 });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },
 
    getActiveParty: (req, res) => {
        Party.find({ is_active: true }, { is_active: 0 }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteParty: async (req, res) => {
        const id = req.params.id;
        await Party.deleteOne({ _id: Object(id) }).then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send({message:`Document with id ${id} was deleted successfully`, status: 200});
            } else {
                res.status(404).send(`Document with id ${id} not found`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteManyParty: async (req, res) => {
        await Party.deleteMany({}).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).send(`Document not found`);
            } else {
                res.status(200).send(`${result.deletedCount} documents were deleted`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteAllParty: async (req, res) => {
        await Party.deleteMany({}).then(result => {
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

