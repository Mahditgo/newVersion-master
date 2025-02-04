const mongoose = require('mongoose');

const bankInfoSchema = new mongoose.Schema({
    reportId : {
        type : String,
        reuqired : true
    },
    items : [
        {
            moeinCode : {
                type : Number,
                required : true
            },
            tafsilCode : {
                type : Number,
                required : true
            },
            bankName : {
                type : String,
                required : true
            },
            accountType : {
                type : String,
                required : true
            },
            accountNumber : {
                type : String,
                required : true
            },
            currencyType : {
                type : String,
                required : true
            },
            depositType : {
                type : String,
                required : true
            },
            statuse : {
                type : String,
                required : true
            },
            debtBalance : {
                type : Number,
                required : true
            },
            creditBalance : {
                type : Number,
                required : true
            },
            currencyDebtBalance : {
                type : Number,
                required : true
            },
            currencyCreditBalance : {
                type : Number,
                required : true
            },
            profitPercentage : {
                type : Number,
                required : true
            },
            profitAmount : {
                type : Number,
                required : true
            }
        }
    ]
});

const BankInformation = mongoose.model('BankInfo', bankInfoSchema);
module.exports = BankInformation;


