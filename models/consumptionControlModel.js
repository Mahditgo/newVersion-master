const mongoose = require('mongoose');


const consumptionControlSchema = new mongoose.Schema({
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
            materialItems : [
                {
                    materialCode : {
                        type : String,
                        required : true
                    },
                    materialName : {
                        type : String,
                        required : true
                    },
                    unit : {
                        type : String,
                        required : true
                    },
                    coefficient : {
                        type : Number,
                        required : true
                    }
                }
            ]
        }
    ]
});

const ConsumptionControl = mongoose.model('ConsumptionControl', consumptionControlSchema);
module.exports = ConsumptionControl;