const { Schema, model } = require('mongoose')


const instituteSchema = new Schema({
    name: { type: String },
    access: {
        name: { type: String },
        label: { type: String }
    },
    reportCount: { type: Number, default: 1 },
    atfType: { type: String }
}, { timestamps: true })
module.exports = model('Institute', instituteSchema);

