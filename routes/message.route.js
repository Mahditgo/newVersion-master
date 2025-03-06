const express = require('express');

const messageController = require('./../controllers/message.controller');
const { requireAuth } = require('./../middleswares/requireAuth')

const router = express.Router();

router.use(requireAuth);

router.get("/users",  messageController.getUsersForSidebar);
router.get("/:id",  messageController.getMessages);

router.post("/send/:id",  messageController.sendMessage);

module.exports = router;
