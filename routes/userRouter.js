const { Router } = require('express')
const router = Router();

const {
    addUser,
    getUsers,
    deleteUser
} = require('./../controllers/userController')



const { requireAuth } = require('./../middleswares/requireAuth')
// const { requireAdmin } = require('./../middlewares/requireAdmin')
router.use(requireAuth)
// router.use(requireAdmin)
router.post('/', addUser)
router.get('/', getUsers)
router.delete('/', deleteUser)

module.exports = router