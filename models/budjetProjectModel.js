const mongoose = require('mongoose');


const budjetProjectSchema = new mongoose.Schema({
    reportId : {
        type : String,
        required : true
    },
    items : [
        {
            reportName : {
                type : String,
                required : true
                
            },
            year : {
                type : String,
                required : true
            },
            jobTitle : {
                type : String,
                required : true
            },
            employeePostion : {
                type : String,
                required : true
            },
            budjetHour : {
                hour : { type : Number},
                minutes : { type : Number}
            }
        }
    ]

});

const BudjetProject = mongoose.model('BudjetProject', budjetProjectSchema);
module.exports = BudjetProject;