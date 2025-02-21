const User = require('./../models/User')
const mongoose = require('mongoose')
// const CurrentFile = require('./../models/CurrentFile')

setTimeout(async () => {
    // await User.findByIdAndUpdate("6550d96472c5bed56203303e", { institute: { name: "تمامی موسسات", access: "allAccess" } })
    // await CurrentFile.create({ atf: 7000, title: 'فهرست قسمت', type: "CC", category: "اطلاعات کلی", priority: 1 })
}, 1000)



const addUser = async (req, res) => {
    try{
        let { user } = req
        if(user.role.name === "admin"){
            let { name, institute, job, email, phone, password, role, companyInfo } = req.body
            if ( companyInfo.id ) {
                let activeReport = new mongoose.Types.ObjectId(companyInfo.id)
                let isCompanyUser = true
                let result = await User.signup(name, institute, job, email, phone, password, role, companyInfo, activeReport, isCompanyUser)
                res.json(result)
            } else {
                let result = await User.signup(name, institute, job, email, phone, password, role, companyInfo )
                res.json(result)
            }
        }else if(user.role.name === "instituteAdmin"){
            let { institute } = user
            let { name, job, email, phone, password, role, companyInfo } = req.body
            if ( companyInfo.id ) {
                let activeReport = new mongoose.Types.ObjectId(companyInfo.id)
                let isCompanyUser = true
                let result = await User.signup(name, institute, job, email, phone, password, role, companyInfo, activeReport, isCompanyUser)
                res.json(result)
            } else {
                let result = await User.signup(name, institute, job, email, phone, password, role, companyInfo )
                res.json(result)
            }
        }else{
            res.status(400).json({ error: 'شما مجوز دسترسی به این صفحه را ندارید' })
        }
    }catch(e){
        console.log(e)
        res.status(500).json({ error: e.message })
    }
}



const getUsers = async (req, res) => {
    try{
        let { role } = req.user
        let { name } = role;
        if(name === "admin"){
            let users = await User.find().sort('-createdAt');
            res.json(users)
        }else if(name === "instituteAdmin"){
            let instituteName = req.user.institute.name
            let users = await User.find({ 'institute.name': instituteName }).sort('-createdAt')
            res.json(users)
        }
    }catch(e){
        console.log(e)
        res.status(500).json({ error: e.message })
    }
}

const deleteUser = async (req, res) => {
    try{
        let { id } = req.body
        let admin1 = process.env.ADMIN_ID_1
        let admin2 = process.env.ADMIN_ID_2
        let objectId = new mongoose['Types'].ObjectId(id);
        if(objectId === admin1){
            return res.status(400).json({ error: 'کاربر مدنظر را نمیتوان حذف کرد' })
        }
        if(objectId === admin2){
            return res.status(400).json({ error: 'کاربر مدنظر را نمیتوان حذف کرد' })
        }
        let user = await User.findByIdAndDelete(id)
        res.json(user)
    }catch (e) {
        console.log(e)
        res.status(500).json({ error: e.message })
    }
}


module.exports = {
    addUser,
    getUsers,
    deleteUser
}