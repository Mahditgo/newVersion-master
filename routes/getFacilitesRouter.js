const {Router} = require('express');
const facilitesController = require('./../controllers/getFacilitesDescriptionController')
// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
const router = Router();

router.get('/:reportId/:timeVar', facilitesController.getFacilitesDescription);

module.exports = router;