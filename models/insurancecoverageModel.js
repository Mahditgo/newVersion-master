const mongoose = require('mongoose');


const insurancecoverageSchema = new mongoose.Schema({
    reportId : {
        type : String,
        reqiured : true
    },

    items : [
       { 
            propertyNumber : {
                type : String,
                required : true
            },
            propertyTitle : {
                type : String,
                required : true
            },
            purchaseDate : {
                type : String,
                required : true
            },
            location : {
                type : String,
                required : true
            },
            purchasePrice : {
                type : Number,
                required : true
            },
            endDepreciation : {
                type : Number,
                required : true
            },
            insurancecoverage : {
                type : Number,
                required : true
            },
            difference : {
                type : Number,
                required : true
            }
        }   
    ]
});

const insurancecoverageModel = mongoose.model('Insurancecoverage' , insurancecoverageSchema);
module.exports = insurancecoverageModel;