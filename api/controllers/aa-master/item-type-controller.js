const ItemType = require('../../models/aa-master/item-type-model');

module.exports = {

    createItemType: async (req, res, next) => {
        const body = req.body;
        const itemType = new ItemType({
            name: body.name,
            is_product: body.is_product,
            is_service: body.is_service,
            is_active: true
        });
        await itemType.save().then(result => {
            return res.status(201).json({
                message: 'Item type created successfully',
                data: result
            });
        }).catch(err => {
            if (err.code === 11000)
                res.status(400).json({ error: `${Object.keys(err.keyPattern).join(', ')} already exists.` });
            else if (err.name === 'ValidationError')
                res.status(400).json({ error: Object.values(err.errors).map(error => error.message) });
        });
    },
  

    updateItemType: async (req, res, next) => {
        const body = req.body;
        await ItemType.updateOne({ _id: body._id }, body).then(result => {
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

    getItemType: async (req, res) => {
        await ItemType.find().then(result => {
            if (!result)
                return res.status(404).send('ItemType not found');
            else
                return res.status(200).json({ data: result });
        }).catch(err => {
            return res.status(500).send('Internal server error', err);
        })
    },

    getActiveItemType: (req, res) => {
        ItemType.find({ is_active: true }, { is_active: 0 }).then(result => {
            res.status(200).json({ data: result });
        }).catch(err => {
            res.status(200).json({ data: err });
        })
    },

    deleteItemType: async (req, res) => {
        const id = req.params.id;
        await ItemType.deleteOne({ _id: Object(id) }).then(result => {
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

