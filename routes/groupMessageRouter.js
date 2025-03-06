const {Router} = require('express');
const groupmessageController = require('./../controllers/groupMessageController');
const router = Router();

// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
router.post('/', groupmessageController.createGroupMessage);
router.get('/', groupmessageController.getGroupMeassages);
router.delete('/:id', groupmessageController.deleteMessageGroup);
router.patch('/items/:itemId', groupmessageController.updateMessageGroup);



module.exports = router;