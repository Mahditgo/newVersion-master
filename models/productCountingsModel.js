const mongoose = require('mongoose');


const productCountingDetailsSchema = new mongoose.Schema({
    reportId : {
        type : String,
        required : true,
        index : true
    },
    
     productCode : String,
     productName : String,
     counting : Number   
    
});



const productCountingDetails = mongoose.model('ProductCountingDetails' , productCountingDetailsSchema);
module.exports = productCountingDetails;