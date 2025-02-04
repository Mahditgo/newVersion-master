const mongoose = require('mongoose');


const otherGoodsCountingDetailsSchema = new mongoose.Schema({
    reportId : {
        type : String,
        reqiured : true
    },

    filePaths: { type: [String], default: [] },

    items : [
        {
            otherGoodCode : String,
            otherGoodName : String,
            otherGoodCounting : Number
        }
    ]
});

const OtherGoodCountingDetails = mongoose.model('OtherGoodCounting' , otherGoodsCountingDetailsSchema);
module.exports = OtherGoodCountingDetails;