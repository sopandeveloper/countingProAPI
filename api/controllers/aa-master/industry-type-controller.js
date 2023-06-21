const IndustryType = require('../../models/aa-master/industry-type-model');

module.exports = {

    createIndustryType: async (req, res, next) => {
        const body = req.body;
        const industryType = new IndustryType({
            name: body.name,
            is_active: true
        });
        await industryType.save().then(result => {
            return res.status(201).json({
                message: 'Industry type created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    createManyIndustryType: async (req, res, next) => {
        const body = req.body;
        IndustryType.insertMany(body).then(result => {
            return res.status(201).json({
                message: 'IndustryType created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    updateIndustryType: async (req, res, next) => {
        const body = req.body;
        await IndustryType.updateOne({ _id: body._id }, body).then(result => {
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

    getIndustryType: async (req, res) => {
        await IndustryType.find().then(result => {
            if (!result)
                return res.status(404).send('IndustryType not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActiveIndustryType: (req, res) => {
        IndustryType.find({ is_active: true }, { is_active: 0 }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteIndustryType: async (req, res) => {
        const id = req.params.id;
        await IndustryType.deleteOne({ _id: Object(id) }).then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send(`Document with id ${id} was deleted successfully`);
            } else {
                res.status(404).send(`Document with id ${id} not found`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteManyIndustryType: async (req, res) => {
        await IndustryType.deleteMany({}).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).send(`Document not found`);
            } else {
                res.status(200).send(`${result.deletedCount} documents were deleted`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteAllIndustryType: async (req, res) => {
        await IndustryType.deleteMany({}).then(result => {
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

