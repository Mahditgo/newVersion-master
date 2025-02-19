const mongoose = require('mongoose');



const ItemSchema = new mongoose.Schema({
    InvoiceNumber: {
        type: Number,
        required: true
    },
    InvoiceDate: {
        type: Date,
        required: true
    },
    BuyerDetailCode: {
        type: Number,
        required: true
    },
    buyersName: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    salesAmount: {
        type: Number,
        required: true
    },
    AddedValue: {
        type: Number,
        required: true
    },
    finalAmount: {
        type: Number,
        required: true
    }
});



const RecordsSchema = new mongoose.Schema({
    reportId: {
        type: String,
        required: true
    },
    filePaths : {
        type : [String],
        required : true,

    },
    items: {
        type : [ItemSchema],
        required : true
    }
});

const Sale = mongoose.model('Sale', RecordsSchema);
module.exports = Sale;