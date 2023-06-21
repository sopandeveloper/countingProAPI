const Item = require('../models/item-model');

module.exports = {

    createItem: async (req, res, next) => {
        const body = req.body;
        const item = new Item({

            type_id: body.type_id,
            name: body.name,
            primary_unit: body.primary_unit,
            secondary_unit: body.secondary_unit,
            unit_conversion_rate: body.unit_conversion_rate,

            inventory_track_by_id: body.inventory_track_by_id,
            inventory_track_by_name: body.inventory_track_by_name,

            mrp: body.mrp,
            purchase_price: body.purchase_price,
            purchase_price_with_gst: body.purchase_price_with_gst,
            sales_price: body.sales_price,
            sales_price_with_gst: body.sales_price_with_gst,
            wholesale_price: body.wholesale_price,
            min_wholesale_qty: body.min_wholesale_qty,
            hsn_sac: body.hsn_sac,
            gst_rate: body.gst_rate,


            total_stock_qty: body.total_stock_qty,
            opening_qty: body.opening_qty,
            opening_qty_date: body.opening_qty_date,
            low_stock_alert: body.low_stock_alert,
            low_stock_qty: body.low_stock_qty,
            item_code: body.item_code,

            item_stock: body.item_stock,

            category_id: body.category_id,
            location: body.location,
            description: body.description,
            show_online_store: body.show_online_store,
            online_selling_price: body.online_selling_price,
            company_id: body.company_id,
            is_active: true,
            temp_qty: body.temp_qty

        });
        await item.save().then(result => {
            return res.status(201).json({
                message: 'Item created successfully',
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

    createManyItem: async (req, res, next) => {
        const body = req.body;
        Item.insertMany(body).then(result => {
            return res.status(201).json({
                message: 'Item created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },

    updateItem: async (req, res, next) => {
        const body = req.body;
        await Item.updateOne({ _id: body._id }, body).then(result => {
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

    getItem: async (req, res) => {
        await Item.find().then(result => {
            if (!result)
                return res.status(404).send('Item not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActiveItem: (req, res) => {
        Item.find({ is_active: true }, { is_active: 0 }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteItem: async (req, res) => {
        const id = req.params.id;
        await Item.deleteOne({ _id: Object(id) }).then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send({ message: `Document with id ${id} was deleted successfully`, status: 200 });
            } else {
                res.status(404).send(`Document with id ${id} not found`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteManyItem: async (req, res) => {
        await Item.deleteMany({}).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).send(`Document not found`);
            } else {
                res.status(200).send(`${result.deletedCount} documents were deleted`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    deleteAllItem: async (req, res) => {
        await Item.deleteMany({}).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).send(`Document not found`);
            } else {
                res.status(200).send(`${result.deletedCount} documents were deleted`);
            }
        }).catch(err => {
            res.status(500).send(`Error deleting document: ${err}`);
        })
    },

    getStockValue: async (req, res) => {
        const { company_id } = req.body;
        await Item.find({ company_id: company_id, is_active: true }, { total_stock_qty: 1, selling_price: 1, purchase_price: 1, name: 1 }).then(result => {
            if (!result)
                return res.status(404).send('Item not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    }
}

