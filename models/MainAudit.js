const mongoose = require('mongoose')
require('mongoose-long')(mongoose);
const { Schema, model } = mongoose

const mainAuditSchema = new Schema({
    virtualAtf      : Number,
    reportId        : Schema.Types.ObjectId,
    reportItemCode  : Number,
    id              : String,
    codes           : {
            kol     : String,
            moeen   : String,
            tafzil  : String,
            number  : String
    },
    debit           : { type: Schema.Types.Long },
    credit          : { type: Schema.Types.Long },
    descriptionInId : { type: String },
    checkboxOne     : { type: Boolean, default: false },
    checkboxTwo     : { type: Boolean, default: false },
    checkboxThree   : { type: Boolean, default: false },
    checkboxFour    : { type: Boolean, default: false },
    checkboxFive    : { type: Boolean, default: false },
    checkboxSix     : { type: Boolean, default: false },
    checkboxSeven   : { type: Boolean, default: false },
    checkboxEight   : { type: Boolean, default: false },
    comment         : { type: String,  default: "" },
    description     : { type: String,  default: "" },
    accountParty    : {type : String, default: ""}
}, { timestamps: true })

module.exports = model('MainAudit', mainAuditSchema)