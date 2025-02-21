const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
// const gsm = require('./../helper/gsm')
const { Schema } = require("mongoose");
// const Sms = require('./Sms')
// const SmsTemplate = require('./SmsTemplate')


const userSchema = new mongoose.Schema({
    isCompanyUser: { type: Boolean, default: false },
    companyInfo: {
        name: { type: String, default: "" },
        id: { type: Schema.Types.ObjectId, default: null }
    },
    name: {
        first: { type: String },
        last: { type: String }
    },
    institute: {
        name: { type: String },
        access: { type: String }
    },
    job: {
        name: { type: String },
        label: { type: String }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        name: { type: String },
        label: { type: String }
    },
    avatar: {
        type: String,
        default: "filemanager/images/avatars/avatar.jpg"
    },
    mqttToken: {
        type: String
    },
    authCode: {
        code: { type: String },
        expireAt: { type: String }
    },
    activeReport: {
        type: Schema.Types.ObjectId,
        default: "670ed6d12e7f1cca66a2f288"
    }
    // activeReport: Schema.Types.ObjectId,
}, { timestamps: true })


userSchema.statics.signup = async function ( email, phone, password) {
    if (!email || !phone || !password) {
        throw Error('لطفا تمامی موارد مورد نیاز را وارد کنید')
    }
    if (!validator.isEmail(email)) {
        throw Error('آدرس ایمیل وارد شده معتبر نیست')
    }
    if (!validator.isMobilePhone(phone, ['fa-IR'])) {
        throw Error('فرمت شماره تلفن وارد شده معتبر نیست')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('کلمه عبور ضعیف می باشد')
    }
    let exists = await this.findOne({ email })
    if (exists) {
        throw Error('آدرس ایمیل تکراری می باشد')
    }
    exists = await this.findOne({ phone })
    if (exists) {
        throw Error('شماره موبایل تکراری می باشد')
    }
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)
    let mqttToken = await bcrypt.hash(email, salt)
    return await this.create({   email, phone, password: hash })
}



userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All field must be filled')
    }
    let salt = await bcrypt.genSalt(10)
    let user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }
    let match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }
    return user;
}

userSchema.statics.sendAuthCode = async function (phone) {
    let code = Math.random().toFixed(6).slice(2)
    let expireAt = Date.now() + (1000 * 60 * 2)
    let user = await User.findOne({ phone })
    if (!user) {
        throw Error('کاربری با شماره موبایل وارد شده پیدا نشد')
    }
    try {
        let smsTemplate = await SmsTemplate.findOne({ code: 100 })
        let { template } = smsTemplate
        let text = template.replaceAll('authCode', code)
        await this.findOneAndUpdate({ phone }, { $set: { authCode: { code, expireAt } } })
        let result = await gsm.sendMessage(phone, text)
        let { status } = result
        if (status) {
            let { smsId, cost } = result
            await Sms.create({
                smsId, number: phone, text, cost
            })
            return { status: true }
        } else {
            return { status: false }
        }
    } catch (err) {
        throw Error('خطا! لطفا مجدد امتحان کنید')
    }
}



const User = mongoose.model('user', userSchema)
module.exports = User;