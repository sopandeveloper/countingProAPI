const ReminderType = require('../../models/aa-master/reminder-type-model');

module.exports = {

    createReminderType: async (req, res, next) => {
        const body = req.body;
        const reminderType = new ReminderType({
            name: body.name,
            description: body.description,
            icon: body.icon,
            is_premium: body.is_premium,
            is_active: true
        });
        await reminderType.save().then(result => {
            return res.status(201).json({
                message: 'Reminder type created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    createManyReminderType: async (req, res, next) => {
        const body = req.body;
        ReminderType.insertMany(body).then(result => {
            return res.status(201).json({
                message: 'ReminderType created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    updateReminderType: async (req, res, next) => {
        const body = req.body;
        await ReminderType.updateOne({ _id: body._id }, body).then(result => {
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

    getReminderType: async (req, res) => {
        await ReminderType.find().then(result => {
            if (!result)
                return res.status(404).send('ReminderType not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActiveReminderType: (req, res) => {
        ReminderType.find({ is_active: true }, { is_active: 0 }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteReminderType: async (req, res) => {
        const id = req.params.id;
        await ReminderType.deleteOne({ _id: Object(id) }).then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send(`Document with id ${id} was deleted successfully`);
            } else {
                res.status(404).send(`Document with id ${id} not found`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteManyReminderType: async (req, res) => {
        await ReminderType.deleteMany({}).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).send(`Document not found`);
            } else {
                res.status(200).send(`${result.deletedCount} documents were deleted`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteAllReminderType: async (req, res) => {
        await ReminderType.deleteMany({}).then(result => {
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

