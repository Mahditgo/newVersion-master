const {Router} = require('express');
const ToolsDescription = require('./../controllers/getToolsDescriptionController')
// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
const router = Router();

router.get('/:reportId/:timeVar', ToolsDescription.getToolsDescription);

module.exports = router;