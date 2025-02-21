const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req, res, next) => {
    let { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({ error: "authorization token required" })
    }

    let token = authorization.split(' ')[1]
    try{
        const _id = jwt.verify(token, process.env.SECRET)
        req.user = await User.findById(_id)
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

module.exports = {
    requireAuth
}