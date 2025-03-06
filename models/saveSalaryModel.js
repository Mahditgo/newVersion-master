const mongoose = require('mongoose');


const saveSalarySchema = new mongoose.Schema({
    reportId : {
        type : String,
        required : true
    },
    items : [
        {
            code : {
                type : Number,
                required : true
            },
            namePersonel : {
                type : String,
                required : true
            },
            salary : {
                type : Number,
                required : true
            },
            dateEmployment : {
                type : String,
                required : true
            },
            savePrevious : {
                type : Number,
                required : true
            },
            saveCurrency : {
                type : Number,
                required : true
            }
        }
    ]
});


const SaveSalaryModel = mongoose.model('SaveSalary', saveSalarySchema);
module.exports = SaveSalaryModel;