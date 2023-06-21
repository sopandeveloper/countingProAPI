const State = require('../../models/aa-master/state-model');

module.exports = {

    createState: async (req, res, next) => {
        const body = req.body;
        const state = new State({
            name: body.name,
            code: body.code,
            is_active: true,
        });
        await state.save().then(result => {
            return res.status(201).json({
                message: 'State created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    createManyState: async (req, res, next) => {
        const body = req.body;

        State.insertMany(body).then(result => {
            return res.status(201).json({
                message: 'State created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    updateState: async (req, res, next) => {
        const body = req.body;
        await State.updateOne({ _id: body._id }, body).then(result => {
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

    getState: async (req, res) => {
        await State.find().then(result => {
            if (!result)
                return res.status(404).send('State not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActiveState: (req, res) => {
        State.find({ is_active: true }, { is_active: 0 }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteState: async (req, res) => {
        const id = req.params.id;
        await State.deleteOne({ _id: Object(id) }).then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send(`Document with id ${id} was deleted successfully`);
            } else {
                res.status(404).send(`Document with id ${id} not found`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteManyState: async (req, res) => {
        await State.deleteMany({}).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).send(`Document not found`);
            } else {
                res.status(200).send(`${result.deletedCount} documents were deleted`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteAllState: async (req, res) => {
        await State.deleteMany({}).then(result => {
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

