const { Schema, default: mongoose } = require ('mongoose');


const fixedAssetSchema = new Schema({
    reporId : {
        type : String,
        reqriued : true
    },
    filePaths: { type: [String], default: [] },
    items : [
        {
            landDetails : {
                type : String,
                reqriued : true
            },
            builingDetails : {
                type : String,
                reqriued : true
            },
            furnitureDetails : {
                type : String,
                reqriued : true
            },
            machineDetails : {
                type : String,
                reqriued : true
            },
            facilitiesDeails : {
                type : String,
                reqriued : true
            },
            carDetails  : {
                type : String,
                reqriued : true
            },
            toolesDetails : {
                type : String,
                reqriued : true
            },
            otherAssetsDetails : {

            }
        }
    ]
});

const FixedAsset = mongoose.model("FixedAsset", fixedAssetSchema);
module.exports = FixedAsset;