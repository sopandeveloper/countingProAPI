const ReportType = require('../../models/aa-master/report-type-model');

module.exports = {

    createReportType: async (req, res, next) => {
        const body = req.body;
        const reportType = new ReportType({
            name: body.name,
            description: body.description,
            icon: body.icon,
            is_premium: body.is_premium,
            label: body.label,
            url: body.url,
            report_category: body.report_category,
            is_active: true
        });
        await reportType.save().then(result => {
            return res.status(201).json({
                message: 'Report type created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    createManyReportType: async (req, res, next) => {
        const body = req.body;
        ReportType.insertMany(body).then(result => {
            return res.status(201).json({
                message: 'ReportType created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    updateReportType: async (req, res, next) => {
        const body = req.body;
        await ReportType.updateOne({ _id: body._id }, body).then(result => {
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

    getReportType: async (req, res) => {
        await ReportType.find().then(result => {
            if (!result)
                return res.status(404).send('ReportType not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActiveReportType: (req, res) => {
        ReportType.find({ is_active: true }, { is_active: 0 }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteReportType: async (req, res) => {
        const id = req.params.id;
        await ReportType.deleteOne({ _id: Object(id) }).then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send(`Document with id ${id} was deleted successfully`);
            } else {
                res.status(404).send(`Document with id ${id} not found`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteManyReportType: async (req, res) => {
        await ReportType.deleteMany({}).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).send(`Document not found`);
            } else {
                res.status(200).send(`${result.deletedCount} documents were deleted`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteAllReportType: async (req, res) => {
        await ReportType.deleteMany({}).then(result => {
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

