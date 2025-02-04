const mongoose = require('mongoose');


const materialCountingDetailsSchema = new mongoose.Schema({
    reportId : {
        type : String,
        reqiured : true
    },

    filePaths: { type: [String], default: [] },

    items : [
        {
            materialCode : String,
            materialName : String,
            materialCounting : Number
        }
    ]
});




const MaterialCountingDetails = mongoose.model('MaterilCounting' , materialCountingDetailsSchema);
module.exports = MaterialCountingDetails;