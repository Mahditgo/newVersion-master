const mongoose = require('mongoose');


const supportSchema = new mongoose.Schema({

    InstituteName : {
         type : String,
         required : true
     },
     InstituteId : {
         type : String,
         required : true
     },
     items : [
        {
            userName : {
                type : String,
                required : true
            },
            userId : {
                type : String,
                required : true
            },
            classification : {
                type : String,
                required : true
            },
            DateOfApplication : {
                type : Date,
                required : true,
                default : Date.now()
            },
            requestTime : {
                type : String,
                required : true,
               
            },
        
            userOccupation : {
                type : String,
                required : true
            },
            requestDescription : {
                type : String,
                required : true
            },
            answeDate : {
                type : String,
                required : true
            },
            responseTime : {
                type : String,
                required : true
            },
            answerDescription : {
                type : String,
                required : true
            },
            applicationStatus : {
                type : String,
                default : "ٌwaitingToReply",
                
            },
            adminResponse: {
                type: String,
                default: ""  
            }
        }
     ]
   


});

const Support = mongoose.model("Support", supportSchema);
module.exports = Support;