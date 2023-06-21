const Unit = require('../../models/aa-master/unit-model');

module.exports = {

    createUnit: async (req, res, next) => {
        const body = req.body;
        const unit = new Unit({
            name: body.name,
            short_name: body.short_name,
            is_active: true,
        });
        await unit.save().then(result => {
            return res.status(201).json({
                message: 'Unit created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    createManyUnit: async (req, res, next) => {
        const body = req.body;
        
       Unit.insertMany(body).then(result => {
            return res.status(201).json({
                message: 'Unit created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },
    
    updateUnit: async (req, res, next) => {
        const body = req.body;
        await Unit.updateOne({ _id: body._id }, body).then(result => {
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

    getUnit: async (req, res) => {
        await Unit.find().then(result => {
            if (!result)
                return res.status(404).send('Unit not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActiveUnit: (req, res) => {
        Unit.find({ is_active: true }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteUnit: async (req, res) => {
        const id = req.params.id;
        await Unit.deleteOne({ _id: Object(id) }).then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send(`Document with id ${id} was deleted successfully`);
            } else {
                res.status(404).send(`Document with id ${id} not found`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },
 
    deleteManyUnit: async (req, res) => {
        await Unit.deleteMany({}).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).send(`Document not found`);
            } else {
                res.status(200).send(`${result.deletedCount} documents were deleted`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },
    
    deleteAllUnit: async (req, res) => {
        await Unit.deleteMany({}).then(result => {
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

