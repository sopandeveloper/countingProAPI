const GstRate = require('../../models/aa-master/gst-rate-model');

module.exports = {

    createGstRate: async (req, res, next) => {
        const body = req.body;
        const gstRate = new GstRate({
            rate: body.rate,
            is_active: true,
        });
        await gstRate.save().then(result => {
            return res.status(201).json({
                message: 'Gst rate created successfully',
                data: result
            });   
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },
 
    createManyGstRate: async (req, res, next) => {
        const body = req.body;
        
       GstRate.insertMany(body).then(result => {
            return res.status(201).json({
                message: 'Gst rate created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000) 
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },
    
    updateGstRate: async (req, res, next) => {
        const body = req.body;
        await GstRate.updateOne({ _id: body._id }, body).then(result => {
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

    getGstRate: async (req, res) => {
        await GstRate.find().then(result => {
            if (!result)
                return res.status(404).send('GstRate not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActiveGstRate: (req, res) => {
        GstRate.find({ is_active: true }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteGstRate: async (req, res) => {
        const id = req.params.id;
        await GstRate.deleteOne({ _id: Object(id) }).then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send(`Document with id ${id} was deleted successfully`);
            } else {
                res.status(404).send(`Document with id ${id} not found`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },
 
    deleteManyGstRate: async (req, res) => {
        await GstRate.deleteMany({}).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).send(`Document not found`);
            } else {
                res.status(200).send(`${result.deletedCount} documents were deleted`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },
    
    deleteAllGstRate: async (req, res) => {
        await GstRate.deleteMany({}).then(result => {
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

