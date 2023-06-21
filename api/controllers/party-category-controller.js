const PartyCategory = require('../models/party-category-model');

module.exports = {

    createPartyCategory: async (req, res, next) => {
        const body = req.body;
        const pc = new PartyCategory({
            name: body.name ,
            company_id: body.company_id
        });
        await pc.save().then(result => {
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

    updatePartyCategory: async (req, res, next) => {
        const body = req.body;
        await PartyCategory.updateOne({ _id: body._id }, body).then(result => {
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

    getPartyCategoryByCompany: async (req, res) => {
        const { company_id } = req.body;
        await PartyCategory.find({ is_active: true, company_id: company_id }, { is_active: 0, company_id: 0 }).then(result => {
            if (!result)
                return res.status(404).send('PartyCategory not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    deletePartyCategory: async (req, res) => {
        const id = req.params.id;
        await PartyCategory.deleteOne({ _id: Object(id) }).then(result => {
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

