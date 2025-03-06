const { Router } = require('express')
const router = Router()
const { login,
    signup,
    sendAuthCode,
    phoneLogin,
    verifyToken
} = require('./../controllers/authController')

const { requireAuth } = require('./../middleswares/requireAuth')

router.post('/login', login)
router.post('/register', signup)
router.post('/sendAuthCode', sendAuthCode)
router.post('/phoneLogin', phoneLogin)
router.get('/verifyToken', requireAuth, verifyToken)

module.exports = router;
