const mongoose = require('mongoose');


const productionsDetailsSchema = new mongoose.Schema({
    reportId : {
        type : String,
        reqiured : true
    },

    filePaths: { type: [String], default: [] },

    items : [
        {
            productCode : String,
            productName : String,
            productionQuantity : Number
        }
    ]
});

const productionDetails = mongoose.model('ProductionDetails' , productionsDetailsSchema);
module.exports = productionDetails;