const mongoose = require('mongoose');


const otherGoodsSchema = new mongoose.Schema({
    reportId: { 
        type: String, 
        required: true 
    },
    items : [
        {
            warehouseCode : {
                type : String,
                default : "0",
                required : true,
            },
            warehouseName : {
                type : String,
                required : true
            },
            productCode : {
                type : String,
                required : true
            },
            productName : {
                type : String,
                required : true
            },
            
            firstNumber : {
                type : Number,
                required : true
            },
            firstAmount : {
                type : Number,
                required : true
            },
            purchaseNumber : {
                type : Number,
                required : true
            },
            purchaseAmount : {
                type : Number,
                required : true
            },
            consumptionAmount : {
                type : Number,
                required : true
            },
            consumptionNumber : {
                type : Number,
                required : true
            },
            endNumber : {
                type : Number,
                required : true
            },
            endAmount : {
                type : Number,
                required : true
            }
        }
    ],
    filePaths: { type: [String], default: [] }

});


const otherGoods = mongoose.model('OtherGood', otherGoodsSchema);
module.exports = otherGoods;
