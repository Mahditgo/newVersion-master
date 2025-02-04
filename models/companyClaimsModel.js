const mongoose = require('mongoose');

const companyClaimsSchema = new mongoose.Schema({
    reportId : {
        type : String,
        required : true
    },
    items : [
        {
            moeinCode : {
                type : String,
                required : true
            },
            tafsilCode : {
                type : String,
                required : true
            },
            Name : {
                type : String,
                required : true
            },
            description : {
                type : String,
                required : true
            },
            type : {
                type : String,
                required : true
            },
            collectionForecast : {
                type : String,
                required : true
            },
            documentation : {
                type : String,
                required : true
            },
            guaranteeAmount : {
                type : Number,
                required : true
            },
            guaranteeType : {
                type : String,
                required : true
            },
            guarantee : {
                type : String,
                required : true
            },
            lastPayment : {
                type : Date,
                required : true
            },
            receivablesStorage : {
                type : Number,
                required : true
            }
        }
    ]
    
});

const CompanyClaim = mongoose.model('CompanyClaim', companyClaimsSchema);
module.exports = CompanyClaim;