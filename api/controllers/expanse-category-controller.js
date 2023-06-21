const ExpanseCategory = require('../models/expanse-category-model');

module.exports = {

    createExpanseCategory: async (req, res, next) => {
        const body = req.body;
        const ic = new ExpanseCategory({
            name: body.name,
            company_id: body.company_id,
            is_active: true
        });
        await ic.save().then(result => {
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

    updateExpanseCategory: async (req, res, next) => {
        const body = req.body;
        await ExpanseCategory.updateOne({ _id: body._id }, body).then(result => {
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

    getExpanseCategoryByCompany: async (req, res) => {
        const { company_id } = req.body;
        await ExpanseCategory.find({ is_active: true, company_id: company_id }, { is_active: 0, company_id: 0 }).then(result => {
            if (!result)
                return res.status(404).send('ExpanseCategory not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    deleteExpanseCategory: async (req, res) => {
        const id = req.params.id;
        await ExpanseCategory.deleteOne({ _id: Object(id) }).then(result => {
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

