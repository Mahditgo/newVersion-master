const {Router} = require('express');
const otehrAssetsDescription = require('./../controllers/getOtherAssetsDescriptionController')
// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
const router = Router();

router.get('/:reportId/:timeVar', otehrAssetsDescription.getOtherAssetsDescription);

module.exports = router;