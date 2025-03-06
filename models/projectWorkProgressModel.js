const mongoose = require('mongoose');


const projectWorkPRogresSchema = new mongoose.Schema({
    reportId : {
        type : String,
        required : true
    },
    items : [
        {
            code : {
                type : String,
                required : true
            },
            projectName : {
                type : String,
                required : true
            },
            contractAmountRiyals : {
                type : Number,
                required : true
            },
            currencyContractAmount : {
                type : Number,
                required : true
            },
            currencyUnit : {
                type : String,
                required : true
            },
            rate : {
                type : Number,
                required : true
            },
            rialRateForeignContract : {
                type : Number,
                required : true
            },
            totalContract : {
                type : Number,
                required : true
            },
            amountCurrentExpenses : {
                type : Number,
                required : true
            },
            amountPreviousExpenses : {
                type : Number,
                required : true
            },
            amountAccumulateExpenses : {
                type : Number,
                required : true
            },
            completionEstimate : {
                type : Number,
                required : true
            },
            cumulativeProgress : {
                type : Number,
                required : true
            },
            currentProgress : {
                type : Number,
                required : true
            },
            workProgressAmount : {
                type : Number,
                required : true
            },
            cumulativeApprovedWork : {
                type : Number,
                required : true
            },
            accumulatedSurplus : {
                type : Number,
                required : true
            },
            previousSurplus : {
                type : Number,
                required : true
            },
            identifiableSurplus : {
                type : Number,
                required : true
            }
        }
    ]
});

const ProjectWorkProgress = mongoose.model("ProjectWorkProgress", projectWorkPRogresSchema);
module.exports = ProjectWorkProgress;