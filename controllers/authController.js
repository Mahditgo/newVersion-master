// const User         = require('./../models/User')
// // const Institute    = require('./../models/Institute')
// const jwt          = require('jsonwebtoken')
// // const { sendMessage } = require('./../helper/gsm')
// const Sms          = require('./../models/Sms')
// const SmsTemplate  = require('./../models/SmsTemplate')


// setTimeout(async () => {
//     // await User.signup("Dashti_rd@yahoo.com", "09128349110", "Rd3388@9110")
// })



// const createToken = (_id) => {
//     return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" })
// }


// const login = async (req, res) => {
//     let { email, password, moduleAccess } = req.body
//     console.log(req.body, moduleAccess)
//     try{
//         let user = await User.login(email, password)
        
        
//         const aceess = user.institute.access
//         console.log(moduleAccess, aceess );
//         if( aceess !== "allAccess") {
//             if(moduleAccess !== aceess ) {
//                 return res.status(404).json({success: false, message : "سطح دسترسی شما با ماژول انتخابی برابر نمباشد"})
            
//             }
//         }
      
//         let token = createToken(user._id)
//         let { institute } = user
//         let { name: instituteName } = institute
       
       
//         let instituteInfo = await Institute.findOne({ name: instituteName })
        
        
//         let { atfType } = instituteInfo
//         res.json({ email, token, avatar: user.avatar, mqttToken: user.mqttToken, role: user.role, job: user.job, name: user.name, institute, atfType })
//     }catch(err){
//         console.log(err)
//         res.status(400).json({ error: err.message })
//     }
// }



// const phoneLogin = async (req, res) => {
//     let { phone, authCode } = req.body
//     console.log(req.body)
//     let user = await User.findOne({ phone })
//     if(!user){
//         return res.status(400).json({ error: 'شماره تلفن و کد وارد شده مطابقت ندارند' })
//     }
//     let { code, expireAt } = user.authCode
//     if(authCode === code){
//         if(Date.now() > expireAt){
//             res.status(400).json({ error: 'کد منقضی شده است' })
//         }else{
//             let token = createToken(user._id)
//             let { institute } = user
//             let { name: instituteName } = institute
//             let instituteInfo = await Institute.findOne({ name: instituteName })
//             let { atfType } = instituteInfo
//             res.json({ email: user.email, token, avatar: user.avatar, mqttToken: user.mqttToken, role: user.role, job: user.job, name: user.name, institute, atfType })
//         }
//     }else{
//         res.status(400).json({ error: 'کد وارد شده معتبر نیست' })
//     }
// }

// const signup = async (req, res) => {
//     let { email, phone, password } = req.body
//     try{
//         let user = await User.signup(email, phone, password)
//         let token = createToken(user._id)
//         await sendMessage(phone, `Welcome dear ${email.split("@")[0]} to Assist-Me project!`)
//         await sendMessage("09119100991", `New register from ${email}`)
//         res.json({ email, token, avatar: user.avatar, mqttToken: user.mqttToken })
//     }catch(err){
//         res.status(400).json({ error: err.message })
//     }
// }

// const sendAuthCode = async (req, res) => {
//     let { phone } = req.body

//     try{
//         await User.sendAuthCode(phone)
//         res.json({ status: true })
//     }catch(err){
//         res.status(400).json({ error: err.message })
//     }

// }

// const verifyToken = async (req, res) => {
//     res.json({ status: true })
// }
// module.exports = {
//     login,
//     signup,
//     sendAuthCode,
//     phoneLogin,
//     verifyToken
// }