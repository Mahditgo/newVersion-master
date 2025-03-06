const mongoose = require('mongoose');


const landDetailsSchema = new mongoose.Schema({
    reportId : {
        type : String,
        required   : true
    },
    filePaths: { type: [String], default: [] },
    items : [
        {
            
              propertyNumber : {
                type : String,
                required : true
              },
              propertyTitle : {
                type : String,
                required : true
              },
              purchaseDate : {
                type : String,
                required : true
              },
              loaction : {
                type : String,
                required : true
              },
              descriptionRate : {
                type : String,
                required : true
              },
              descriptionMethod : {
                type : String,
                required : true
              },
              purchasePrice : {
                type : Number,
                required : true
              },
              firstDepreciation : {
                type : Number,
                required : true
              },
              bookValue : {
                type : Number,
                required : true
              },
              periodDepreciation : {
                type : Number,
                required : true
              },
              endDepreciation : {
                type : Number,
                required : true
              }
            
        }
    ]
});

const LandDetails = mongoose.model('LandDetail', landDetailsSchema);
module.exports = LandDetails;