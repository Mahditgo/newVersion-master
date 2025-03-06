const mongoose = require('mongoose');


const groupMessageSchema = new mongoose.Schema({
    reportId : {
        type : String,
        reqiured : true
    },
    items : [
        {
            InstituteName : {
                type : String,
                required : true
            },
            instituteId : {
                type : String,
                required : true
            },
            messageDate : {
                type : Date,
                required : true
            },
            description : {
                type : String,
                reqiured : true
            }

        }
    ]
});

const GroupMessage = mongoose.model('GroupMessage', groupMessageSchema);
module.exports = GroupMessage;