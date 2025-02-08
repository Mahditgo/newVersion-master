const mongoose = require('mongoose');



const atfSchema = new mongoose.Schema({
    reportId : {
        type : String,
        required : true
    },
    titleAtf : {
        type : String,
        required : true
    },
    items : [
        {
            id_row : {
                type : String,
                required : true
            },
            endAtf : {
                type : String,
                required : true
            }
        }
    ]
});

const Atf = mongoose.model('Atf', atfSchema);
module.exports = Atf;