const {Router} = require('express');
const discreptionController = require('./../controllers/getDiscreptionController')
// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
const router = Router();

router.get('/:reportId/:timeVar', discreptionController.getDiscreption);

module.exports = router;