const mongoose = require('mongoose');

const approvalSaleSchema = new mongoose.Schema({
    reportId : {
        type : String,
        required : true
    },
    items : [
        {
            productCode : {
                type : String,
                required : true
            }, 
            productName : {
                type : String,
                required : true
            },
            approvalDate : {
                type : Date,
                required : true
            },
            approvedRate : {
                type : Number,
                required : true
            },
            currencyType : {
                type : String,
                required : true
            }

        }
    ]
});

const ApprovalSale = mongoose.model('ApprovalSale', approvalSaleSchema);
module.exports = ApprovalSale;