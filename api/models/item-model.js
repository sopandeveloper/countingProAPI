const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  
    type_id: {
        type: String
    },
    name: {
        type: String
    },
    primary_unit: {
        type: Object
    },
    secondary_unit:{
        type: Object
    },
    unit_conversion_rate: {
        type: Number
    },

    inventory_track_by_id: {
        type: String
    },
    inventory_track_by_name: {
        type: String
    },

    mrp: {
        type: Number
    },
    purchase_price: {
        type: Number
    },
    purchase_price_with_gst: {
        type: Boolean
    },
    sales_price: {
        type: Number
    },
    sales_price_with_gst: {
        type: Boolean
    },
    wholesale_price: {
        type: Number
    },
    min_wholesale_qty: {
        type: Number
    },
    hsn_sac: {
        type: String
    },
    gst_rate: {
        type: Number
    },
    total_stock_qty: {
        type: Number
    },
    opening_qty: {
        type: Number
    },
    opening_qty_date: {
        type: Date
    },
    low_stock_alert: {
        type: Boolean
    },
    low_stock_qty: {
        type: Number
    },
    item_code: {
        type: String
    },
    item_stock: {
        type: Array
    },
    category_id: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    show_online_store: {
        type: Boolean
    },
    online_selling_price: {
        type: Number
    },
    company_id: {
        type: String
    },
    is_active: {
        type: Boolean
    },
    temp_qty: {
        type: Number
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
